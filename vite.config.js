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
        base: env.VITE_API_URL,
      },
    });
  }else if(command == 'build'){
    return defineConfig({
      plugins: [react()],
      define: {
        //.env
        base: env.VITE_API_URL
      },
    });
  }
};
