import path from "path";

import {
  buildWebpackConfig,
  BuildEnv,
  BuildPaths,
} from "@packages/build-config";

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
  };

  const mode = env.mode || "development";
  const isDev = mode === "development";
  const port = env.port || 3000;

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    port,
  });
};
