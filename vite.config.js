import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotnev from "dotenv";

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    define: {
      //.env
      "process.env.": env,
    },
  });
};