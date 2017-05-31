var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*', 'browser-sync', 'pump'],
        replaceString: /\bgulp[\-.]/
    });

plugins.pump = require('pump');

var envType = plugins.util.env.type;

var pathGlob = {
    src: './src',
    prod: './dist'
};

var path = {
    srcJs: pathGlob.src + '/js',
    prodCss: pathGlob.prod + '/css',
    prodJs: pathGlob.prod + '/js'
};

var gulpTasks = {
    lint: function () {
        return this.src([path.srcJs + '/**/*.js'])
            .pipe(plugins.eslint({
                'rules': {
                    'quotes': [1, 'single'],
                    'semi': [1, 'always'],
                    'indent': [2, 4]
                }
            }))
            .pipe(plugins.eslint.format())
            .pipe(plugins.eslint.failAfterError());
    },
    jsProcess: function (cb) {
        plugins.pump([
                gulp.src(path.srcJs + '/**/*.js'),
                (envType === 'dev' ? plugins.sourcemaps.init() : plugins.util.noop()),
                plugins.rename({suffix: '.min'}),
                plugins.uglify(),
                (envType === 'dev' ? plugins.sourcemaps.write() : plugins.util.noop()),
                gulp.dest(path.prodJs)
            ],
            cb
        );
    },
    browserSync: function () {
        plugins.browserSync.init([pathGlob.prod + '/**/*.*'],{
            server: {
                baseDir: pathGlob.prod
            },
            port: 2020
        });
    },
    watch: function () {
        this.watch(path.srcJs + '/**/*.js', ['js']);
    }
};

for(var key in gulpTasks){
    if (gulpTasks.hasOwnProperty(key)) {
        gulp.task(key, gulpTasks[key]);
    }
};

gulp.task('js', ['lint', 'jsProcess']);

gulp.task('dev', ['js', 'watch', 'browserSync']);
gulp.task('prod', ['js']);