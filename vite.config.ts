import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "CoursesTSLib",
      formats: ["es", "umd"],
      fileName: (format) => `courses-ts-lib.${format}.js`,
    },
    // https://vitejs.dev/config/build-options.html#build-rollupoptions
    rollupOptions: {
      external: [
        "react",
        "react-dom/client",
        "@mui/material",
        "@mui/icons-material",
        "hls.js",
        "react-router-dom",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
