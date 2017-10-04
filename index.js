#!/usr/bin/env node

'use strict'

var includes = require('array-includes')
var yargs = require('yargs')
var stdin = process.stdin
var stdout = process.stdout
var content = ''

var argv = yargs
  .option('keep', {
    describe: 'the name of one or more packages to keep',
    default: [],
    type: 'array'
  })
  .argv

var removeDeps = function (data, key, keep) {
  if (data[key]) {
    for (var property in data[key]) {
      if (!includes(keep, property)) {
        delete data[key][property]
      }
    }
  }
}

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', function (chunk) {
  content += chunk
})

stdin.on('end', function () {
  var parsedData = JSON.parse(content)
  removeDeps(parsedData, 'dependencies', argv.keep)
  removeDeps(parsedData, 'devDependencies', argv.keep)
  var outputJSON = JSON.stringify(parsedData, null, 2)
  stdout.write(outputJSON)
  stdout.write('\n')
})
