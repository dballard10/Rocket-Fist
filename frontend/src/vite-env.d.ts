/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Supabase
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;

  // Dev Role Switcher
  readonly VITE_ENABLE_DEV_SWITCHER: string;
  readonly VITE_DEV_EMAILS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}




