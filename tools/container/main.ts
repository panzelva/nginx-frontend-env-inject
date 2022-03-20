import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import { parse } from "node-html-parser";
import fs from "node:fs/promises";
import path from "node:path";
import { getBrowserEnv, getWebpackDefineObj } from "./env";

// exit node process on unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.log(error);
  throw error;
});

async function start() {
  dotenv.config();

  const startupEnv = cleanEnv(process.env, {
    PUBLIC_FOLDER: str({ default: "/usr/share/nginx/html" }),
  });

  const browserEnv = getBrowserEnv();
  const env = getWebpackDefineObj(browserEnv);

  console.log("=================================");
  console.log("========== SETTING ENV ==========");
  console.log("=================================");
  for (const [key, value] of Object.entries(env)) {
    console.log(`${key}: ${value}`);
  }
  console.log("=================================");

  const indexHtmlPath = path.resolve(startupEnv.PUBLIC_FOLDER, "index.html");
  const indexHtml = await fs.readFile(indexHtmlPath, "utf-8");
  const html = parse(indexHtml);

  html.querySelector("head")?.insertAdjacentHTML(
    "beforebegin",
    `<script>window.env={};${Object.entries(env)
      .map(([key, value]) => `${key}=${value}`)
      .join(";")}</script>`
  );

  await fs.writeFile(indexHtmlPath, html.toString());

  console.log(`Injected env to ${indexHtmlPath} successfully!`);
  console.log("=================================");
  console.log("=================================");
}

start();
