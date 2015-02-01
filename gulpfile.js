const gulp = require("gulp");
const jshint = require("gulp-jshint");
const stylish = require("jshint-stylish");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const serve = require("gulp-serve");
const karma = require("gulp-karma");
const path = {
	in: "app",
	out: "dist",
	test: "test",
	bower: "components/bower_components"
};
const testFiles = [
	path.out + "/**/*.js",
	"!" + path.out + "/vendor/**/*",
	path.test + "/spec/*.spec.js",
	path.test + "/fixture/*.fixture.js"
];

gulp.task("jshint", function() {
	"use strict";
	return gulp.src(path.in + "**/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task("clean", function() {
	"use strict";
	return gulp.src(path.out, { read: false })
		.pipe(clean());
});

gulp.task("copy", function() {
	"use strict";
	return gulp.src(path.in)
		.pipe(gulp.dest(path.out));
});

gulp.task("minify", function() {
	"use strict";
	gulp.src([
			path.out + "/**/*.js", 
			"!" + path.out + "/" + path.bower
		])
		.pipe(uglify(getUglifyOptions()))
		.pipe(gulp.dest(path.out));
});

gulp.task("concat", function() {
	gulp.src([path.out + "/scripts/**/*.js", 
		.pipe(concat({ path: "app.js", stat: { mode: 0666 }}))
		//.pipe(concat("app.js"))
		.pipe(gulp.dest(path.out));
	// octet literals not allowed in strict mode, so added quotes
});

gulp.task("test", function() {
	"use strict";
	return gulp.src(testFiles)
		.pipe(karma({
			configFile: "karma.conf.js",
			action: 		"run"
		}))
		.on("error", function errorHandler(err) {
			// force gulp exit non 0
			throw err;
		});
});

gulp.task("serve", serve(path.out));

gulp.task("watch", function() {
	"use strict";
	karma.server.start({
		configFile: "karma.conf.js",
		autoWatch: 	true
	});

	gulp.watch(testFiles, ["jshint"]);
});

gulp.task("build", [
		"clean", 
		"copy", 
		"minify", 
		"concat", 
		"test"
	], function() {
	"use strict";
	// after build task
});

gulp.task("default", [
		"clean", 
		"copy", 
		"jshint", 
		"minify", 
		"concat", 
		"serve"
	], function afterDefault() {
	"use strict";
	gulp.src(testFiles)
		.pipe(karma({
			configFile: "karma.conf.js",
			action:			"watch"
		}));
});

function getUglifyOptions() {
	"use strict";
	return {
		output: {
			beautify: true,
			width: 240,
			max_line_len: 240,
			//ie_proof: false,
			source_map: path.out
		},
		preserveComments: "some"
	};
}
