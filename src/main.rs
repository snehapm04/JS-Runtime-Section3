use deno_core::{ 
    error::AnyError, 
    resolve_path, 
    FsModuleLoader, 
    JsRuntime, 
    PollEventLoopOptions, 
    RuntimeOptions,
};
use std::env;
use std::rc::Rc;

async fn run_js(file_path: &str) -> Result<(), AnyError> {
    let main_module = resolve_path(file_path, env::current_dir()?.as_path())?;
    let mut js_runtime = JsRuntime::new(RuntimeOptions {
        module_loader: Some(Rc::new(FsModuleLoader)),
        ..Default::default()
    });

    js_runtime
    .execute_script("[runjs:runtime.js]",include_str!("runtime.js"))
    .unwrap();

    let mod_id = js_runtime.load_main_es_module(&main_module).await?;
    let result = js_runtime.mod_evaluate(mod_id);
    
    js_runtime.run_event_loop(PollEventLoopOptions { 
        wait_for_inspector: false, 
        pump_v8_message_loop: false,
    }).await?;

    result.await
}

fn main() {
    let runtime = tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap();
    
    if let Err(error) = runtime.block_on(run_js("./example.js")) {
        eprintln!("error: {}", error);
    }
}
