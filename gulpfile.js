'use strict';

const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const config = require('./webpack.config');
const browserSync = require('browser-sync').create();
const seq = require('run-sequence');

const execFile = require('child_process').execFile;
const flow = require('flow-bin');

gulp.task('default', () => {
    console.log('gulp default task. Do nothing.');
});

gulp.task('clean', () => {
    return del(['dist/**/*']);
});

gulp.task('build', done => {
    seq('clean', 'build:script', 'copy', done);
});
gulp.task('build:script', ['typecheck'], done => {
    // hack
    const bundler = webpack(config);
    bundler.run(done);
});
gulp.task('typecheck', done => {
    execFile(flow, ['check'], done);
});

gulp.task('copy', done => {
    seq('copy:html', 'copy:style', done);
});
gulp.task('copy:html', () => {
    return gulp.src(['src/**/*.html']).pipe(gulp.dest('dist'));
});
gulp.task('copy:style', () => {
    return gulp.src(['src/styles/**/*.css']).pipe(gulp.dest('dist/styles'));
});

gulp.task('watch', ['build'], () => {
    gulp.watch(['src/**/*.html'], ['copy:html']);
    gulp.watch(['src/**/*.css'], ['copy:style']);
    gulp.watch(['src/**/*.js'], ['build:script']);
});

gulp.task('serve', ['watch'], () => {
    browserSync.init({
        server: 'dist',
        open: true,
        files: [
            'dist/**/*'
        ]
    });
});


