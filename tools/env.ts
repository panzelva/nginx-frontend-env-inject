import { cleanEnv, num, str, url, bool } from "envalid";

export function getBrowserEnv() {
  return cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production", "staging", "test"],
    }),
    API_URL: url({ default: "http://localhost:4000" }),
    NUM: num({ default: 0 }),
    BOOL: bool({ default: true }),
  });
}

export type BrowserEnv = Omit<
  ReturnType<typeof getBrowserEnv>,
  "isDevelopment" | "isDev" | "isProduction" | "isProd" | "isTest"
>;

export function getWebpackDefineObj(): Record<string, string> {
  const cleanedEnv = getBrowserEnv();

  return {
    ...Object.fromEntries(
      Object.entries(cleanedEnv).map(([key, value]) => {
        return [`window.env.${key}`, JSON.stringify(value)];
      })
    ),
    ["window.env"]: JSON.stringify(cleanedEnv),
  };
}
