var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');

gulp.task('hello', function() {
    console.log('Hello Zell');
});

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        /*.pipe(browserSync.reload({
            stream: true
        }))*/
});

gulp.task('watch', [/*'browserSync',*/ 'sass'], function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Other watchers
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});