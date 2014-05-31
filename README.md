# binary-parser

  Painless streaming binary protocol parsers using generators.

## Installation

    npm install binary-parser

## Streaming use

  This module uses the exact same generator interface as [binary-parse-stream](https://github.com/nathan7/binary-parse-stream), which presents a streaming interface to a generator parser.

## Usage

```javascript
var BinaryParser = require('binary-parser')
```

  BinaryParser is a function that takes a buffer and passes the return value of your generator back.
  When your generator yields a number, it'll be fed a buffer of that length from the input.
  If it yields -1, it'll be given the value of the first byte instead of a single-byte buffer.

## Example

  The following module parses a protocol that consists of a 32-bit unsigned big-endian type parameter, an unsigned 8-bit length parameter, and a buffer of the specified length.
  It returns `{type, buf}` objects.

```js
var BinaryParser = require('binary-parser')

module.exports = BinaryParser(function*() {
  var type = (yield 4).readUInt32BE(0, true)
    , length = yield -1
    , buf = yield length
  return { type: type, buf: buf }
})
```
