# Tuupl

## About

Tuupl is a simple color space converter for Hex and RGB. Enter a Hex code and the app will show you the corresponding RGB value, and *vice versa*.

I made this originally one afternoon in 2011 as a basic PHP function with a rubbish form because I needed to know the RGB(a) values from the Hex codes I was given. Shortly after this I then changed the app to use Javascript to speed up the calculation. Now I use [SASS](http://sass-lang.com/) during builds to do this `background-color: rgba($red, 0.5);`. The app still comes in useful every-now-and-then so with the new facelift it should work even faster.

A few points to note:
* Made the RGB input fuzzy in case pasted codes have mistakes, it will still read it
* Probably won’t work in legacy Internet Explorer (8 and below) without some changes to the Javascript
* It’s a bit clunky on phones but I would have thought the main use is for desktop at work so you can copy-and-paste the color value you need

## Setup

    $ git clone git@github.com:dezpaco/tuupl.git
    $ cd tuupl
    $ make install

Then setup your webserver to point the document root to the `public/` directory. `index.php` within that directory should be the `DirectoryIndex`.

## Gulp

You can automate the compiling of `sass` with [Gulp](http://gulpjs.com/), which is an automated task runner.

### Using Gulp

To build your sass files, you can run:

    $ gulp sass

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
