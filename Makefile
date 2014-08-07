.PHONY: templates

npm:
	npm install

gulp-js:
	gulp js

gulp-sass:
	gulp sass

install: npm templates gulp-sass gulp-js

templates:
	test -f composer.phar || curl -sS https://getcomposer.org/installer | php
	php composer.phar install
