// Cargar módulo (plugin instalados)
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    scss = require('gulp-scss');

// Tarea: Compilar sass a css
gulp.task('scss-to-css', function() {
    gulp.src('./scss/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('./css/'))
});

// Tarea: Recarga en navegador automaticamente
gulp.task('browser-sync', function() {
    browserSync.init({
        injectChanges: true,
        files: ['./**/*.{html,css,js}'],
        server: './'
    });
});

gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', ['scss-to-css']);
});

// Tarea: Ejecutar toda las tareas por defecto con 'gulp'
gulp.task('default', ['browser-sync', 'scss-to-css', 'watch']);

