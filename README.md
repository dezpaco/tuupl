# Tuupl

## About

Tuupl is a simple color space converter for Hex and RGB. Enter a Hex code and the app will show you the corresponding RGB value, and *vice versa*.

View a working version at [https://tuupl.com](https://tuupl.com).

A few points to note:
* Made the RGB input fuzzy in case pasted codes have mistakes, it will still read it
* The JavaScript will need a polyfill for addEventListener if you want to use it with IE 8 (or older)
* It’s a bit clunky on phones or tablets but I would have thought the main use is for desktop during work so you can copy-and-paste the color value you need

## Setup

    $ git clone git@github.com:dezpaco/tuupl.git
    $ cd tuupl
    $ make install

Then setup your webserver to point the document root to the `public/` directory. `index.html` within that directory should be the `DirectoryIndex`.

The html file to use for working on the project is `_base.html`. This will be minified (and renamed) to `index.html` when you run either of the two commands, `gulp` or `gulp html`.

## Gulp

You can automate the compiling of `sass` with [Gulp](http://gulpjs.com/), which is an automated task runner.

### Using Gulp

To build your sass files, you can run:

    $ gulp sass

To minify Convert.js, you can run:

    $ gulp js

To minify `_base.html` to `index.html`, you can run:

    $ gulp html

All three of these Gulp tasks are part of the default:

    $ gulp

## Dependencies

### System dependencies

You’ll need:

 * Node.js - [http://nodejs.org/](http://nodejs.org/)
 * Ruby
 * Rubygems

Depending on your system, you may need to prefix these commands with `sudo`.

 * `gem install sass`
 * `npm install gulp -g`

Make sure that you have `NODE_PATH` setup to point to your node install, and that the npm module path is in your `PATH` directory. These may differ from system to system.

For `fish` shell, you can add this to your `~/.config/fish/fish.config`:

    $ set NODE_PATH "/usr/local/lib/node_modules"
    $ set PATH "/usr/local/share/npm/bin" $PATH

### Project dependencies

Install Gulp dependencies. Run this command from the root of the project directory:

    $ npm install
