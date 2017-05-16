const gulp = require("gulp"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    scss = require("gulp-scss"),
    cleanCSS = require("gulp-clean-css"),
    imagemin = require("gulp-imagemin"),
    rev = require("gulp-rev"),
    revCollector = require("gulp-rev-collector"),
    webserver = require("gulp-webserver"),
    url = require("url"),
    dataJson = require("./data/data.js");

gulp.task("default", function () {

});

gulp.task("jsmin", function () {
    gulp.src("./src/js/*.js")
        .pipe(concat("common.js"))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("./src/js"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./src/rev/js"));

});

gulp.task("cssmin", function () {
    gulp.src("./src/css/*.sass")
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest("./src/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./src/rev/css"));
});

gulp.task("html", function () {
    gulp.src("./src/*.html")
        .pipe(gulp.dest("./src/html"));
});

gulp.task("htmlrev", function () {
    gulp.src(["./src/rev/**/*.json", "./src/html/*.html"])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                "css": "css",
                "js": "js"
            }
        }))
        .pipe(gulp.dest("./src/html"));
});

gulp.task("testImagemin", function () {
    gulp.src("./src/images/*.jpg")
        .pipe(imagemin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./src/images"));
});

gulp.task("build", ["jsmin", "cssmin", "htmlrev"]);

gulp.task("webserver", function () {
    gulp.watch("./src/css/*.sass", ["cssmin"]);
    gulp.watch("./src/js/*.js", ["jsmin"]);
    gulp.watch("./src/html/*.html", ["html"]);

    gulp.src("./src")
        .pipe(webserver({
            liverload: true,
            directoryListing: true,
            middleware: function (req, res, next) {
                var reqPath = url.parse(req.url).pathname;
                var routes = dataJson.data();
                routes.forEach(function (i) {
                    if (i.route == reqPath) {
                        i.handle(req, res, next);
                    }
                });
                next();
            },
            open: "html/iphone.html"
        }))
});