const gulp = require('gulp');
const ts = require('gulp-typescript');
const path = require('path');
const merge = require('merge2');
const child_process = require('child_process');
const typescript = require('typescript');
const fs = require('fs');

// Server configuration
const serverConfigPath = path.join(__dirname, 'tsconfig.json');
const serverProject = ts.createProject(serverConfigPath);
const serverSrc = ['src/**/*.ts'];

// Destination folders
const serverDest = '../dist';

// Main file
const serverExecutable = '../dist/server.js';

const tsReporter = ts.reporter.longReporter();

// Compiltation tasks
gulp.task('server', function () {
    var tsResult = gulp
        .src(serverSrc)
        .pipe(serverProject(tsResult));

    return merge([
        tsResult.js.pipe(gulp.dest(serverDest))
    ]);
});

gulp.task('default', ['server']);

gulp.task('watch', ['default'], function () {
    gulp.watch(serverSrc, ['server']);
});

gulp.task('develop', ['watch'], function () {
    // A home made server runner
    let child = null;;
    let busy = false;

    function spawn() {
        child = child_process.fork(serverExecutable);
        busy = false;
    }

    gulp.watch(serverSrc, ['server', function () {
        if (busy)
            return;

        busy = true;
        child.once('exit', spawn);
        child.kill();
    }]);

    spawn();
});