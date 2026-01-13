import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import type { UserConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = { plugins: [react()] };
  if (mode === "production") {
    config["base"] = "https://isutomu.github.io/odin-book-frontend-top/";
  }

  return config;
});
