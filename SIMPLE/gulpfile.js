// Cargar módulo (plugin instalados)
var gulp = require('gulp'),
    browserSync = require('browser-sync');

// Tarea: Recarga en navegador automaticamente
gulp.task('browser-sync', function() {
    browserSync.init({
        injectChanges: true,
        files: ['./**/*.{html,css,js}'],
        server: './'
    });
});

// Tarea: Ejecutar toda las tareas por defecto con 'gulp'
gulp.task('default', ['browser-sync']);

