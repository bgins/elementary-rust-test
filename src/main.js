import { Renderer, el } from "./elem-core.js";

// Emulate offline-renderer with render and process functions
// that call into the Wasm module in `elementary-wasm.js`.
//
// The Wasm module will render and return us output data.
//
// We will add a Rust render extension that pushes the output data
// to the audio device.

// Instantiate a renderer
let core = new Renderer((batch) => {
  console.log(JSON.stringify(batch));
});

// Test Elemetary render callback
core.render(el.mul(0.3, el.cycle(440)), el.mul(0.3, el.cycle(441)));

// Print hello from Rust code
Deno.core.ops.op_hello([1, 2, 3]);
