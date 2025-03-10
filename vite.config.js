import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (command == "serve") {
    return defineConfig({
      plugins: [react()],
      define: {
        //.env
        "process.env": JSON.stringify(env.local),
      },
    });
  }else {
    return defineConfig({
      plugins: [react()],
      define: {
        //.env
        "process.env": JSON.stringify(env.prod)
      },
    });
  }
};
