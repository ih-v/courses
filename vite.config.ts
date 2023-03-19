import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === "serve") {
    console.log(command, mode, ssrBuild);
    return {
      // dev specific config
      plugins: [react()],
    };
  } else {
    // command === 'build'
    console.log(command, mode, ssrBuild);
    return {
      // build specific config
      plugins: [react()],
      base: "/courses/",
    };
  }
});
