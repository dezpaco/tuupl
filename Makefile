.PHONY: templates

npm:
	npm install

gulp-sass:
	gulp sass

install: npm templates gulp-sass

templates:
	test -f composer.phar || curl -sS https://getcomposer.org/installer | php
	php composer.phar install
