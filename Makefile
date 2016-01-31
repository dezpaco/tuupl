.PHONY: templates

npm:
	npm install

gulp-js:
	gulp js

gulp-sass:
	gulp sass

install: npm gulp-sass gulp-js
