"use strict";

// Idea: Sorting Scss properties...

const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify");
const del = require("del");
const rename = require("gulp-rename");
sass.compiler = require("node-sass");

const paths = {
  generic: { src: "./src", dest: "./dist" },
  markup: { src: "./src/*.html", dest: "./dist" },
  styles: { src: "./src/sass/**/*.scss", dest: "./dist/css" },
  scripts: { src: "./src/js/**/*.js", dest: "./dist/js" },
  assets: { src: ["./src/font/*.*", "./src/img/**/*.*"], dest: "./dist" }
};

// Delete ./dist/ folder
const clean = () => del(paths.generic.dest);
exports.clean = clean;
exports.clean.description = "Delete dist/ folder";

// MARKUP
// Minify markup and place in ./dist/
// TODO: Make minify optional
const markup = () => src(paths.markup.src).pipe(dest(paths.markup.dest));

// STYLES
// Transpile Sass to CSS and minify and place in ./dist/css
// TODO: Make use of prefixer (postCSS?)
const styles = () =>
  src(paths.styles.src)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());

// SCRIPTS
// Minify scripts and place in ./dist/js
// TODO: Make minify optional
const scripts = () =>
  src(paths.scripts.src)
    .pipe(dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(paths.scripts.dest));

// ASSETS
// Copy assets to ./dist/
const assets = () =>
  src(paths.assets.src, { base: paths.generic.src }).pipe(
    dest(paths.assets.dest)
  );

// Build
// TODO: Make build compress JS (and HTML)
// TODO: Only build (not watch) should compress Sass
const build = parallel(markup, styles, scripts, assets);
exports.build = series(clean, build);
exports.build.description = "Clean, build";

// Watch
// TODO: Make Watch not compress Sass and JS (and HTML)
const watchFiles = done => {
  browserSync.init({ server: { baseDir: paths.generic.dest } });
  watch(paths.markup.src, series(markup, browserSync.reload));
  watch(paths.styles.src, styles);
  watch(paths.scripts.src), series(scripts, browserSync.reload);
  watch(paths.assets.src), series(assets, browserSync.reload);
  done();
};
watchFiles.displayName = "Watch";
exports.default = series(clean, build, watchFiles);
exports.default.description = "Clean, build, watch src/ folder";
