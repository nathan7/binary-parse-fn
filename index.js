'use strict';
exports = module.exports = BinaryParser
var Readable = require('readable')

function BinaryParser(Parser) {
  return function(data) {
    var read = Readable(data)
      , parser = Parser()
      , ret = parser.next(undefined)

    while (!ret.done) {
      var needed = ret.value | 0
        , chunk = read(needed)
      ret = parser.next(chunk)
    }

    if (read.able) throw new Error('unexpected input (leftover data)')

    return ret.value
  }
}
