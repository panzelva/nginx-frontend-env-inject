import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import { parse } from "node-html-parser";
import { getWebpackDefineObj } from "./env";

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

  const browserEnv = getWebpackDefineObj();

  const indexHtmlPath = path.resolve(startupEnv.PUBLIC_FOLDER, "index.html");
  const indexHtml = await fs.readFile(indexHtmlPath, "utf-8");
  const html = parse(indexHtml);

  html.querySelector("head")?.insertAdjacentHTML(
    "beforebegin",
    `
      <script>
        window.env={};
        ${Object.entries(browserEnv)
          .map(([key, value]) => `${key}=${value}`)
          .join(";")}
      </script>
    `
  );

  await fs.writeFile(indexHtmlPath, html.toString());

  // { shell: true, stdio: "inherit" } - toto pošle stdout a stderr rovnou do konzole
  const childProcess = spawn("nginx", ["-g", "'daemon off;'"], {
    shell: true,
    stdio: "inherit",
  });

  childProcess.on("close", (code) => {
    if (code !== 0) {
      throw new Error(`child_process spawn failed with exit code ${code}`);
    }
  });
}

start();
