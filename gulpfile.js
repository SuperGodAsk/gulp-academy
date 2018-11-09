/*global require*/
"use strict";

var fileExists = require('file-exists');

var gulp = require('gulp'),
    path = require('path'),
    data = require('gulp-data'),
    pug = require('gulp-pug'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    include = require('gulp-include'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

var paths = {
    build: {
        css: './build/css/',
        js: './build/js/',
        base: './build/',
        img: './build/images/',
        fonts: './build/fonts/'
    },
    src: {
        pug: './src/*.pug',
        scss: 'src/sass/**/*.scss',
        data: {
            base: './src/_data/',
            all: './src/_data/**/*.json'
        },
        js: 'src/js/**/*.js',
        img: 'src/images/**/*.*',
        fonts:'src/fonts/**/*.*'
    },
    vendor: {
        css: './vendor/style.css',
        js: './vendor/script.js'
    }
};


//Чистим html
gulp.task('clean', function () {
    return gulp.src(paths.build.base)
        .pipe(clean());
});

gulp.task('img', function () {
    return gulp.src(paths.src.img)
        .pipe(gulp.dest(paths.build.img))
});

gulp.task('fonts', function () {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.build.fonts))
});


gulp.task('pug', function () {
    return gulp.src(paths.src.pug)
        .pipe(data(function (file) {
            if (fileExists.sync(paths.src.data.base + path.basename(file.path) + '.json')) {
                return require(paths.src.data.base + path.basename(file.path) + '.json');
            }
        }))
        .pipe(pug({
            pretty: true
        }))
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest(paths.build.base));
});

gulp.task('rebuild', ['pug'], function () {
    browserSync.reload();
});


gulp.task('browser-sync', ['sass','scripts','pug'], function () {
    browserSync({
        server: {
            baseDir: paths.build.base
        },
        notify: false
    });
});


gulp.task('vendorCss', function () {
    return gulp.src(paths.vendor.css)
        .pipe(include())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(paths.build.css))
});

gulp.task('vendorJs', function () {
    return gulp.src(paths.vendor.js)
        .pipe(include())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.build.js))
});

gulp.task('sass', function () {
    return gulp.src(paths.src.scss)
        .pipe(sass({
            includePaths: [paths.src.scss],
            outputStyle: 'expanded'
        }))
        .on('error', sass.logError)
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(rename('main.css'))
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scripts', function () {
    return gulp.src(paths.src.js)
        .pipe(include())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.build.js))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', function () {
    gulp.watch(paths.src.scss, ['sass']);
    gulp.watch(paths.src.js, ['scripts']);
    gulp.watch(paths.src.img, ['img']);
    gulp.watch('./src/**/*.pug', ['rebuild']);
});


gulp.task('build', [
    'vendorCss',
    'vendorJs',
    'img',
    'fonts',
    'sass',
    'scripts',
    'pug'
]);


gulp.task('default', ['browser-sync', 'watch']);
