// i --save-dev gulp gulp-concat gulp-rename gulp-uglify gulp-sourcemaps
// rimraf node_modules

var gulp = require('gulp'),
		aa_rename = require('gulp-rename'),
		aa_uglify = require('gulp-uglify'),
		aa_sourcemaps = require('gulp-sourcemaps');

gulp.task('aa-production', function() {
	return gulp.src([
		'AppProductionLive/angular2live.js',
	])
		.pipe(aa_sourcemaps.init())
		.pipe(aa_rename('a2uglify.js'))
		.pipe(aa_uglify())
		.pipe(aa_sourcemaps.write('./'))
		.pipe(gulp.dest('AppProductionLive'));
});


gulp.task('default', ['aa-production'], function() {
});