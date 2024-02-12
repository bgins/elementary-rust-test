// // use deno_core::*;
// use deno_core::{
//     include_js_files, op2, Extension, ExtensionFileSource, JsRuntime, Op, RuntimeOptions,
// };

// /// An op for summing an array of numbers. The op-layer automatically
// /// deserializes inputs and serializes the returned Result & value.
// #[op2]
// fn op_sum(#[serde] nums: Vec<f64>) -> Result<f64, deno_core::error::AnyError> {
//     // Sum inputs
//     let sum = nums.iter().fold(0.0, |a, v| a + v);
//     // return as a Result<f64, AnyError>
//     Ok(sum)
// }

// fn main() {
//     // let files = include_js_files!(ext, "src/elementary-wasm.js");
//     // static FILES: [ExtensionFileSource; 1] = include_js_files!(nn, "module:elemaudio" = "a.js");

//     // let file = ExtensionFileSource::new("elemaudio", "elementary-wasm.js");
//     let src = include_str!("test.js");
//     let file = ExtensionFileSource::new("iffy", src);
//     dbg!(&file);

//     // Build a deno_core::Extension providing custom ops
//     let ext = Extension {
//         name: "my_ext",
//         js_files: std::borrow::Cow::Owned(vec![file]),
//         ops: std::borrow::Cow::Borrowed(&[op_sum::DECL]),
//         ..Default::default()
//     };

//     // Initialize a runtime instance
//     let mut runtime = JsRuntime::new(RuntimeOptions {
//         extensions: vec![ext],
//         ..Default::default()
//     });

//     // Now we see how to invoke the op we just defined. The runtime automatically
//     // contains a Deno.core object with several functions for interacting with it.
//     // You can find its definition in core.js.
//     runtime
//         .execute_script_static(
//             "<usage>",
//             r#"
// // Print helper function, calling Deno.core.print()
// function print(value) {
//   Deno.core.print(value.toString()+"\n");
// }

// const arr = [1, 2, 3];
// print("The sum of");
// print(arr);
// print("is");
// print(Deno.core.ops.op_sum(arr));

// // globalThis.iffy_test();
// print(JSON.stringify(globalThis.iffy));

// // And incorrect usage
// try {
//   print(Deno.core.ops.op_sum(0));
// } catch(e) {
//   print('Exception:');
//   print(e);
// }
// "#,
//         )
//         .unwrap();
// }

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
