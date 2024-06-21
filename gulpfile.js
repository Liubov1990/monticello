const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cleanCss = require('gulp-clean-css');
const gulpCopy = require('gulp-copy');
const browserSync = require('browser-sync').create();
const dotenv = require('dotenv');
const imagemin = require('gulp-imagemin');
const webp = require('imagemin-webp');
const replace = require('gulp-ext-replace');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

const browserSyncReload = done => {
  browserSync.reload();
  done();
};

const copySVG = function () {
  return gulp.src('./src/assets/svg/*').pipe(gulpCopy('./dist/', { prefix: 1 }));
};

const images = function () {
  return gulp
    .src('./src/assets/images/**/*.{png,jpg}')
    .pipe(
      imagemin([
        webp({
          quality: 80,
          effort: 6
        })
      ])
    )
    .pipe(replace('.webp'))
    .pipe(gulp.dest('./dist/assets/images'));
};

const ico = function () {
  return gulp.src('./src/assets/images/**/*.ico').pipe(imagemin()).pipe(gulp.dest('./dist/assets/images'));
};

const html = function () {
  return gulp
    .src('./src/*.html')
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest('./dist/'));
};

const css = function () {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
};

const js = function () {
  return browserify({
    entries: ['./src/js/index.js'],
    debug: true,
    transform: [babelify.configure({ presets: ['@babel/preset-env'] })]
  })
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
};

const watchFiles = function () {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });
  gulp.watch('./src/scss/**/*.scss', css).on('change', browserSync.reload);
  gulp.watch('./src/js/**/*js', js).on('change', browserSync.reload);
  gulp.watch(['./src/**/*.html', 'index.html'], gulp.series(html, browserSyncReload));
};

exports.default = gulp.series(html, css, js, copySVG, images, ico, watchFiles);
exports.build = gulp.parallel(html, css, js, copySVG, images, ico);
