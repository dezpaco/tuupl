.PHONY: templates

npm:
	npm install

gulp-js:
	gulp js

gulp-sass:
	gulp sass

gulp-html:
	gulp html

install: npm gulp-sass gulp-js gulp-html
