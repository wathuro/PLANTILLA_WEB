// Cargar módulo (plugin instalados)
var gulp = require('gulp'),
    scss = require('gulp-scss'),
    cleanCSS = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    uglifyJS = require('gulp-uglify'),
    pump = require('pump'),
    browserSync = require('browser-sync');

// Tarea: Compilar sass a css
gulp.task('scss-to-css', function() {
    gulp.src('./dev/scss/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('./dev/scss/'))
});

// Tarea: Minificar css
gulp.task('minify-css', function() {
    return gulp.src('./dev/scss/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/assets/css/'));
});

// Tarea: Compilar pug a html
gulp.task('pug-to-html', function() {
     gulp.src('./dev/pug/*.pug')
    .pipe(pug({pretty: true})) // Pretty es para NO comprimer el html
    .pipe(gulp.dest('./dist/'));
});

// Tarea: Comprimir js
gulp.task('minify-js', function(cb) {
    pump([
        gulp.src('./dev/js/*.js'),
        uglifyJS(),
        gulp.dest('./dist/assets/js/')],
    cb
    );
});

// Tarea: Recarga en navegador automaticamente
gulp.task('browser-sync', function() {
    browserSync.init({
        injectChanges: true,
        files: ['./**/*.{html,css,js}'],
        server: './dist/'
    });
});

// Tarea: Verificar cambios en el archivo *.scss, *.pug, *.js
gulp.task('watch', function() {
    gulp.watch('./dev/scss/**/*.scss', ['scss-to-css']);
    gulp.watch('./dev/scss/*.css', ['minify-css']);
    gulp.watch('./dev/pug/**/*.pug', ['pug-to-html']);
    gulp.watch('./dev/js/*.js', ['minify-js']);
});

// Tarea: Ejecutar toda las tareas por defecto con 'gulp'
gulp.task('default', ['scss-to-css', 'minify-css', 'pug-to-html', 'minify-js', 'browser-sync', 'watch']);

