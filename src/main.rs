use deno_core::{error::AnyError, op2, Extension, Op, PollEventLoopOptions};
use std::{self, env::current_dir, path, rc::Rc};

// Test extension function available as Deno.core.ops.op_hello in JS
#[op2]
fn op_hello(#[serde] nums: Vec<f64>) -> Result<(), deno_core::error::AnyError> {
    println!(
        "{} Hello from Rust",
        nums.iter()
            .map(|n| n.to_string())
            .collect::<Vec<String>>()
            .join(", ")
    );

    Ok(())
}

async fn run_js(file_path: &str) -> Result<(), AnyError> {
    // Main JS entry point
    let main_module = deno_core::resolve_path(file_path, path::Path::new(&current_dir().unwrap()))?;

    // Extension to provide Rust functions to JS
    let hello_extension = Extension {
        name: "hello",
        ops: std::borrow::Cow::Borrowed(&[op_hello::DECL]),
        ..Default::default()
    };

    // Prepare JS runtime
    let mut js_runtime = deno_core::JsRuntime::new(deno_core::RuntimeOptions {
        module_loader: Some(Rc::new(deno_core::FsModuleLoader)),
        extensions: vec![hello_extension],
        ..Default::default()
    });

    // Prepare and evaluate main module
    let mod_id = js_runtime.load_main_module(&main_module, None).await?;
    let result = js_runtime.mod_evaluate(mod_id);

    // Start the runtime
    js_runtime
        .run_event_loop(PollEventLoopOptions::default())
        .await?;

    // Await the promised main module
    result.await
}

fn main() {
    // Prepare tokio runtime
    let runtime = tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap();

    // Run JS runtime with the main module
    if let Err(error) = runtime.block_on(run_js("./src/main.js")) {
        println!("error: {}", error);
    };
}
