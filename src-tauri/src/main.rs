#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // Suppress noisy GTK key warnings on Linux
    #[cfg(target_os = "linux")]
    {
        std::env::set_var("G_MESSAGES_DEBUG", "");
        std::env::set_var("RUST_LOG", "warn");
    }

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
