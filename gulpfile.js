var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    jsPath = 'public/js/*.js',
    jsDist = 'public/js/dist',
    es2015Path = 'public/js/*.es6.js';

gulp.task('sass', function() {
    return gulp.src('public/css/styles.scss')
        .pipe(plumber())
        .pipe(sass({ errLogToConsole: true }))
        .pipe(csso())
        .pipe(gulp.dest('public/css'));
});

gulp.task('babel', function () {
    return gulp.src([es2015Path])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
			presets: ['@babel/env']
		}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(compilePath));
});

gulp.task('compressScripts', function() {
    return gulp.src([
        jsPath
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDist));
});

gulp.task('watch', function() {

    gulp.watch('public/css/*.scss', gulp.series('sass'));

    gulp.watch([
        'public/js/*.js' /*,
        '!public/js/compiled',
        '!public/js/lib' */],
        gulp.series('compressScripts'));

});

gulp.task('default', gulp.series('sass', 'compressScripts', 'watch'));

