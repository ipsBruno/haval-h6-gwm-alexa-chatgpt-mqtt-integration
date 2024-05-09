# forge

## Install

    npm install forge -g

## What?

`Forge` has a pretty specific use case: you'd like to automate the application
of a set of transformations on a specific file.

If you're tired of writing the same [M|J|Sl|C]afiles over and over,
juggling command line scripts, node.js scripts, or even dealing with the
hassle of having a configuration file sitting in your file directory;
then this program is for you.

## Philosophy

* No configuration or build files you have to check-in to source control
* Simple command line interface
* Easy to program your own custom transformers
* Use existing transformers that work with [browserify](https://github.com/substack/node-browserify)

## Right tool for the job

If you need to automate all the things or love configuring then [grunt](http://gruntjs.com/)
is for you.

If you want something simple and powerful and don't mind programming some then
write a fucking Makefile.

## How?

    forge my_file.js transform1 transform2 transform3

Example, if you want to lint a file then mangle it:

    forge my_file.js jshintify mangleify

Outputs to stdout

> *Pro-tip*: you can include your forge command in the scripts section of your package.json file.

    "scripts": {
      "prepublish": "forge foo.js mangleify > build/foo.min.js"
    }

For more information see [npm scripts](https://npmjs.org/doc/scripts.html)

## Included plug-ins

* [jshintify](https://github.com/goatslacker/jshintify)
* [mangleify](https://github.com/goatslacker/mangleify)

## Available plug-ins

* [coffeeify](https://github.com/substack/coffeeify)
* [icsify](https://github.com/maxtaco/icsify)
* [caching-coffeeify](https://github.com/thlorenz/caching-coffeeify)
* [decomponentify](https://github.com/eugeneware/decomponentify)
* [debowerify](https://github.com/eugeneware/debowerify)
* [deAMDify](https://github.com/jaredhanson/deamdify)
* [hbsfy](https://github.com/epeli/node-hbsfy)
* [liveify](https://github.com/quarterto/liveify)
* [es6ify](https://github.com/thlorenz/es6ify)
* [turn](https://github.com/juliangruber/turn)

## License

[MIT](http://josh.mit-license.org)
