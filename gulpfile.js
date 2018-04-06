var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
var sequence = require('run-sequence');
var util = require('gulp-util');

gulp.task('scripts', () => {
    return gulp.src([
            'node_modules/webfontloader/webfontloader.js',
            'src/base.js',
        ])
        .pipe(concat('fragmentFitText.js'))
        .on('error', util.log)
        .pipe(babel())
        .on('error', util.log)
        .pipe(gulp.dest('./'))
        .on('error', util.log)
        .pipe(connect.reload())
        ;
});

gulp.task('compress', () => {
    return gulp.src('./fragmentFitText.js')
        .pipe(uglify({mangle: true, compress: true}).on('error', util.log))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload())
        ;
});

gulp.task('dist', function(done) {
    sequence('scripts', 'compress', done);
});

gulp.task('watch', function() {
    connect.server({
        livereload: true
    });
    gulp.watch(['src/*.js'], ['scripts']);
});
