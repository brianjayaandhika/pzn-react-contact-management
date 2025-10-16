// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PATH: string; // required string
  readonly VITE_FEATURE_X?: string; // optional string
  // add more as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
