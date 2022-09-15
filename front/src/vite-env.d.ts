/// <reference types="vite/client" />

import { read } from 'fs';

type ImportMetaEnv = {
  readonly VITE_OW_API_URL: string;
  readonly VITE_OW_API_KEY: string;
  readonly VITE_OW_ICON_URL: string;
  readonly VITE_OW_GEO_API_URL: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
