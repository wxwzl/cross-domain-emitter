import resolve from "rollup-plugin-node-resolve"; //—帮助 Rollup 查找外部模块，然后导入
import commonjs from "@rollup/plugin-commonjs"; // —将CommonJS模块转换为 ES2015 供 Rollup 处理
import json from "@rollup/plugin-json"; // 可以将json文件以es6 模块的方式导入引用
import ts from "@rollup/plugin-typescript"; // 解析ts文件转成js,供 Rollup 处理
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser"; //压缩js代码，包括es6代码压缩,供 Rollup 处理
import alias from "@rollup/plugin-alias"; // 别名的解析
import nodePolyfills from "rollup-plugin-node-polyfills"; //解决第三方依赖引入问题。
import packageJSON from "./package.json";
import path from "path";
import fs from "fs";
const getPath = (_path) => path.resolve(__dirname, _path);
const outPutDir = getPath("dist");

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true, force: true });
  }
}
cleanDir(outPutDir);
const customResolver = resolve({
  extensions: [".ts", ".js", ".jsx", ".json", ".less", ".vue"],
});
const aliasPath = alias({
  customResolver,
});
function getPlungins() {
  return [
    aliasPath,
    resolve({
      browser: true,
      preferBuiltins: true,
      jsnext: true,
    }),
    nodePolyfills({
      // include: [
      //   "https",
      //   "url",
      //   "stream",
      //   "assert",
      //   "zlib",
      //   "process",
      //   "buffer",
      // ],
    }),
    json(),
    ts(),
    commonjs(),
  ];
}
const plugins = getPlungins();
plugins.push(
  terser({
    compress: {
      ecma: 2015,
      pure_getters: true,
    },
  })
);
const libName = "CrossDomainEmitter";
function resolvePath(pathStr) {
  return path.resolve(outPutDir, pathStr);
}
const entry = "./src/index.ts";
export default [
  {
    input: entry,
    output: [
      {
        file: packageJSON.main,
        format: "umd",
        exports: "auto",
        name: libName,
      },
    ],
    plugins: plugins,
  },
  {
    input: entry,
    output: [
      {
        file: resolvePath(`index.min.cjs.js`),
        format: "cjs",
        exports: "auto",
        // sourcemap: true,
        // sourcemapFile: resolvePath("sourceMap"),
      },
      {
        file: resolvePath(`index.min.umd.js`),
        format: "umd",
        exports: "auto",
        name: libName,
      },
      {
        file: resolvePath(`index.min.umd.js`),
        format: "umd",
        exports: "auto",
        name: libName,
      },
      {
        file: resolvePath(`index.min.esm.js`),
        format: "esm",
        exports: "auto",
      },
      {
        file: resolvePath(`index.min.amd.js`),
        format: "amd",
        exports: "auto",
      },
      {
        file: resolvePath(`index.min.iife.js`),
        format: "iife",
        name: libName,
        exports: "auto",
      }, //一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
    ],
    plugins: plugins,
  },
  {
    input: entry,
    output: [
      {
        file: resolvePath("index.d.ts"),
        format: "esm",
        exports: "auto",
      },
    ],
    plugins: [dts()],
  },
  {
    input: entry,
    output: [
      {
        file: resolvePath("index.js"),
        format: "umd",
        exports: "auto",
        name: libName,
      },
    ],
    plugins: getPlungins(),
  },
];
