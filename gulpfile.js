var   gulp = require('gulp')
    , browserify = require('browserify')      //from a single JavaScript file, follows the require dependency tree, and bundles them into a single file
    , reactify = require('reactify')          //converts jsx to js
    , source = require('vinyl-source-stream') //transforms the string output from browserify to a gulp stream
    , livereload = require('gulp-livereload')
    , embedlr = require('gulp-embedlr')
    , shell = require('gulp-shell')
    , concatCss = require('gulp-concat-css')
    , minifyCss = require('gulp-minify-css')
    , uglify = require('gulp-uglify')
    , buffer = require('vinyl-buffer')
;

var jsxSources = [
    'src/jsx/*.jsx'
];

var htmlSources = [
    'src/*.html'
];

var cssSources = [
      './node_modules/react-widgets/dist/css/react-widgets.css'
    , './node_modules/bootstrap/dist/css/bootstrap.min.css'
    , 'src/css/*.css'
];

var fontSources = [
    './node_modules/bootstrap/fonts/*'
];


gulp.task('browserify', function(){
    browserify('src/jsx/main.jsx')  //browserify starting point
        .transform('reactify')      //jsx to js
        .bundle()
        .on('error', function(err){ console.log(err.message); })
        .pipe(source('bundle.js'))  //output stream
        .pipe(buffer())
        .pipe(uglify())
        .on('error', function(err){ console.log(err); })
        .pipe(gulp.dest('prod/js'))
        .pipe(livereload())
        ;
});

gulp.task('html', function() {
  gulp.src(htmlSources)
        .pipe(embedlr({src:"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"}))
        .pipe(gulp.dest('prod/'))
        .pipe(livereload())
});

gulp.task('css', function() {
    gulp.src(cssSources)
        .pipe(concatCss("styles/bundle.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest('prod/'));
});

gulp.task('font', function() {
    gulp.src(fontSources)
        .pipe(gulp.dest('prod/bootstrap/dist/fonts/'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(jsxSources, ['browserify']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch(cssSources, ['browserify','css']);
    //gulp.watch(sassSources, ['compass']);
});

gulp.task('default', ['browserify','html','css','font','watch']);

