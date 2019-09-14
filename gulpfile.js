'use strict';

// INCLUDES

const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
// vinyl-transform could be used instead of vinyl-source-stream and vinyl-buffer but it has a dependency vulnerability

// Paths
const { paths, devBuild } = require('./package.json');
// Edit devBuild in package.json to control minifications and other optimizations

// TASKS

// Clean
// Delete ./dist/ folder
const clean = () => del(paths.generic.dest);
exports.clean = clean;
exports.clean.description = 'Delete dist/ folder';

// Markup
// Minify markup and place in ./dist/
const markup = () =>
  src(paths.markup.src)
    .pipe(
      gulpif(
        !devBuild,
        htmlmin({ collapseWhitespace: true, removeComments: true })
      )
    )
    .pipe(dest(paths.markup.dest));

// Styles
// Transpile Sass to CSS, minify and place in ./dist/css
const styles = () =>
  src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulpif(!devBuild, cleanCSS()))
    .pipe(gulpif(!devBuild, rename({ extname: '.min.css' })))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());

// Scripts
// Minify scripts and place in ./dist/js
const scripts = () =>
  browserify('./src/js/script.js')
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(gulpif(!devBuild, uglify()))
    .pipe(gulpif(!devBuild, rename({ extname: '.min.js' })))
    .pipe(dest(paths.scripts.dest));

// Assets
// Copy assets to ./dist/
const assets = () =>
  src(paths.assets.src, { base: paths.generic.src }).pipe(
    dest(paths.assets.dest)
  );

// Build
const build = parallel(markup, styles, scripts, assets);
exports.build = series(clean, build);
exports.build.description = 'Clean, build';

// Watch
const watchFiles = done => {
  browserSync.init({ server: { baseDir: paths.generic.dest } });
  watch(paths.markup.src).on('change', series(markup, browserSync.reload));
  watch(paths.styles.src, styles);
  watch(paths.scripts.src).on('change', series(scripts, browserSync.reload));
  watch(paths.assets.src).on('change', series(assets, browserSync.reload));
  done();
};
watchFiles.displayName = 'Watch';
exports.default = series(clean, build, watchFiles);
exports.default.description = 'Clean, build, watch src/ folder';
