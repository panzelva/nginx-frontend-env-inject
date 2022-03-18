import type { BrowserEnv } from "../tools/env";

export declare global {
  interface Window {
    env: BrowserEnv
  }
}
