var gulp =  require('gulp'),
	sass =	require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),		// Подключаем gulp-concat (для конкатенации файлов)
	uglify = require('gulp-uglifyjs');		// Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename      = require('gulp-rename'); // Подключаем библиотеку для переименования файлов

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')	//Берем все sass файлы из папки sass и дочерних, если таковые будут
				.pipe(sass())
				.pipe(gulp.dest('app/css'))
        		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('scripts',function(){
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',						// Берем jquery
			'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch',['browser-sync','css-libs','scripts'],function(){
	gulp.watch('app/sass/**/*.sass',[sass]);
	gulp.watch('app/*.html',browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);
});