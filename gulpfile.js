var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: ['gulp-*'] });

gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
  .pipe(plugins.plumber())
  .pipe(plugins.sass()).on('error', function (error) { console.log(error.message); this.emit('end');} )
  .pipe(plugins.autoprefixer({
    browsers: ['last 2 versions'],
    cascade: true
  }))
  .pipe(gulp.dest('src/styles/'));
});

gulp.task('coffee', function() {
  return gulp.src('src/coffee/**/*.coffee')
  .pipe(plugins.coffee({bare: true}).on('error', console.log))
  .pipe(gulp.dest('src/scripts/'));
});

gulp.task('images', function () {
  return gulp.src('src/assets/images/**/*')
  .pipe(plugins.cache(plugins.imagemin({
    progressive: true,
    interlaced: true,
    optimizationLevel: 3,
  })))
  .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
  .pipe(plugins.minifyHtml())
  .pipe(gulp.dest('dist/html.min'));
});

gulp.task('appBuild', ['sass', 'coffee', 'wiredep'], function () {
  var assets = plugins.useref.assets();

  return gulp.src('src/**/*.html')
  .pipe(assets)
  .pipe(plugins.if('*.js', plugins.uglify()))
  .pipe(plugins.if('*.css', require('gulp-minify-css')()))
  .pipe(assets.restore())
  .pipe(plugins.useref())
  .pipe(plugins.if('*.html', plugins.minifyHtml()))
  .pipe(gulp.dest('dist'));
});

gulp.task('styles', ['sass'], function () {
  return gulp.src('src/styles/**/*.css')
  .pipe(require('gulp-minify-css')())
  .pipe(gulp.dest('dist/style.min'));
});

gulp.task('scripts', ['coffee'], function () {
  return gulp.src(['src/scripts/**/*.js', 'src/app/**/*.js'])
  //.pipe(concat('app.js')
  .pipe(plugins.uglify())
  .pipe(gulp.dest('dist/scripts.min'));
});

gulp.task('extras', function () {
  return gulp.src(['src/*.*','!src/*.html'])
  .pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['tmp', 'dist']));

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  gulp.src('src/index.html')
  .pipe(wiredep({
    optional: 'configuration',
    goes: 'here'
  }))
  .pipe(gulp.dest('src/'));
});

gulp.task('inject', function () {
  var sources = gulp.src(['src/**/*.js', 'src/styles/**/*.css'], {read: false});
  return gulp.src('./src/index.html')
  .pipe(plugins.inject(sources, {relative: true}))
  .pipe(gulp.dest('./src'));
});

gulp.task('watch-common', ['wiredep', 'inject', 'sass', 'coffee'], function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/coffee/**/*.coffee', ['coffee']);
  gulp.watch('bower.json', ['wiredep']);
  gulp.watch(['src/**/*.js'], ['inject']);
});


/*********************************************/
//Web Server

function initServe(dir){
  var serveStatic = require('serve-static');

  var app = require('connect')();

  if(dir !== 'dist'){
    app.use(require('connect-livereload')({port: 35729}))
    .use('/bower_components', serveStatic('bower_components'));
  }
  app.use(serveStatic(dir));

  require('http').createServer(app).listen(9000)
  .on('listening', function () {
    console.log('Started connect web server on http://localhost:9000');
  });
}

/*
function initProxy(){
  var http = require('http');
  var httpProxy = require('http-proxy');

  var proxy = httpProxy.createProxyServer({});

  var server = http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://127.0.0.1' });
  });
  console.log("listening on port 5050");
  server.listen(5050);
}*/

gulp.task('connect', function () {
  initServe('src');
});

gulp.task('watch-serve', ['connect'], function () {
  plugins.livereload.listen();

  gulp.watch([
    'src/**/*.html',
    'src/**/*.js',
    'src/images/**/*',
    "src/styles/**/*.css"
    ]).on('change', plugins.livereload.changed);
});

gulp.task('serve', ['watch-serve', 'watch-common'], function(){
  require('opn')('http://localhost:9000', 'firefox');
});

gulp.task('open', function (){
  require('opn')('http://localhost:9000', 'firefox');
});

gulp.task('serve:dist', ['build'], function () {
  initServe('dist');
  require('opn')('http://localhost:9000', 'firefox');
});


gulp.task('build', ['appBuild', 'images', 'extras'], function () {
  return gulp.src('dist/**/*').pipe(plugins.size({title: 'build', gzip: false}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

