/*jshint asi: true */
module.exports = forge

var fu = require('fu')
var fs = require('fs')
var subarg = require('subarg')

function isFile(file) {
  return fs.existsSync(file)
}

function transformFiles(transforms) {
  return function (file) {
    return addTransforms(fs.createReadStream(file), transforms, file)
  }
}

function transformStdin(transforms) {
  process.stdin.resume()
  return addTransforms(process.stdin, transforms, null)
}

function addTransforms(stream, transforms, fileName) {
  return fu.foldl(function (stream, transform) {
    return stream.pipe(transform(fileName))
  }, transforms, stream).pipe(process.stdout)
}

function append(obj, prop, x) {
  obj[prop].push(x)
  return obj
}

function addTransformWithOptions(arg) {
  var transform = require(arg._[0])
  return function (file) {
    return transform(file, arg)
  }
}

function forge(args) {
  var argv = subarg(args)

  var x = fu.foldl(function (obj, arg) {
    if (arg._) {
      return append(obj, 'transforms', addTransformWithOptions(arg))
    } else {
      return isFile(arg)
        ? append(obj, 'files', arg)
        : append(obj, 'transforms', require(arg))
    }
  }, argv._, { transforms: [], files: [] })

  return x.files.length
    ? fu.map(transformFiles(x.transforms), x.files)
    : transformStdin(x.transforms)
}
