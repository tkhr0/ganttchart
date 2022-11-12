require("esbuild")
  .build({
    bundle: true,
    entryPoints: ["./src/app.jsx"],
    outdir: "dist/",
    platform: "browser",
    sourcemap: true,
    jsx: "automatic",
    target: ["es6"],
    watch: true,
  })
  .catch(() => process.exit(1));
