module.exports = minify

var escodegen = require('escodegen')
var esmangle = require('esmangle')
var esprima = require('esprima')
var through = require('through')

function minify(file) {
  if (!/\.js/.test(file) && file != null) return through()

  var data = ''
  return through(write, end)

  function write(buf) { data += buf }
  function end() {
    var ast = esprima.parse(data)
    var optimized = esmangle.optimize(ast, null)
    var result = esmangle.mangle(optimized)
    var compressed = escodegen.generate(result, {
      format: {
          renumber: true,
          hexadecimal: true,
          escapeless: true,
          compact: true,
          semicolons: false,
          parentheses: false
      }
    })
    this.queue(compressed)
    this.queue(null)
  }
}
