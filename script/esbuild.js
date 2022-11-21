const { env } = require("node:process");
const cssModulesPlugin = require("esbuild-css-modules-plugin");

const watch = env.NO_WATCH
  ? false
  : {
      onRebuild(error) {
        if (error) console.error("watch build failed");
        else console.log("watch build succeeded");
      },
    };

// Main
require("esbuild").build({
  bundle: true,
  entryPoints: ["./src/app.jsx"],
  outdir: "dist/",
  platform: "browser",
  sourcemap: true,
  jsx: "automatic",
  target: ["es6"],
  watch,
  plugins: [cssModulesPlugin()],
});
