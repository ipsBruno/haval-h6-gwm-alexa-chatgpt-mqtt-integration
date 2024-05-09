module.exports = lint

var jshint = require('jshint').JSHINT
var through = require('through')
var error = console.error.bind(console)

var DARK = '\x1b[90m'
var RED = '\x1b[31m'
var RESET = '\x1b[39m'

function d(s) {
  return DARK + s + RESET
}

function r(s) {
  return RED + s + RESET
}

function lint(file) {
  if (!/\.js/.test(file) && file != null) return through()

  var data = ''
  return through(write, end)

  function write(buf) { data += buf }
  function end() {
    jshint(data)
    if (jshint.errors.length) {
      error('\u2023', file)
      jshint.errors.filter(Boolean).forEach(function (err) {
        error('  ', '\u21AA', d(err.line + ':' + err.character), r(err.code), err.reason)
      })
      error('')
    }
    this.queue(data)
    this.queue(null)
  }
}
