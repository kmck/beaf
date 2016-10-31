import path from 'path';
import glob from 'glob';
import { removeSync, copySync } from 'fs-extra';

import { rollup } from 'rollup';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const DEST_PATH = './dist';
const SRC_JS_PATHS = glob.sync('./src/*.@(js|jsx)');

const cssExportMap = {};
const generateRollupConfig = (entry, dest) => ({
  entry,
  dest,
  format: 'cjs',
  plugins: [
    entry.match(/\/src\/index\.js/) ? postcss({
      plugins: [
        postcssModules({
          scopeBehaviour: 'global',
          getJSON(id, exportTokens) {
            cssExportMap[id] = exportTokens;
          },
        }),
      ],
    }) : false,
    nodeResolve({
      extensions: ['.js', '.jsx'],
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['es2015', { modules: false }],
        'react',
        'stage-0',
      ],
    }),
  ],
  external(id) {
    return id !== entry && !id.match(/\.css$/);
  },
});

console.log('Building BEAF npm files...');

// Clear build directory
console.log(`Wiping ${DEST_PATH}...`);

// Copy static files
console.log('Copying README and other static files...');
[
  './README.md',
  './package.json',
  './src/beaf.css',
].forEach((filePath) => {
  copySync(filePath, path.format({
    ...path.parse(filePath),
    dir: DEST_PATH,
  }));
});

// Run JS and JSX files through Rollup
console.log('Building script files...');
SRC_JS_PATHS.forEach((srcPath) => {
  const parsedSrcPath = path.parse(srcPath);
  const {
    format,
    dest,
    ...config
  } = generateRollupConfig(srcPath, path.format({
    ...parsedSrcPath,
    dir: DEST_PATH,
    base: parsedSrcPath.base.replace(/\.jsx$/, '.js'),
    ext: parsedSrcPath.ext.replace(/\.jsx$/, '.js'),
  }));

  rollup(config).then(bundle => bundle.write({ format, dest }));
});

console.log('All done! Yummy.');
