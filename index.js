#!/usr/bin/env node

'use strict'

const includes = require('array-includes')
const yargs = require('yargs')
const stdin = process.stdin
const stdout = process.stdout
let content = ''

const argv = yargs
  .option('keep', {
    describe: 'the name of one or more packages to keep',
    default: [],
    type: 'array'
  })
  .argv

const removeDeps = function (data, key, keep) {
  if (data[key]) {
    for (const property in data[key]) {
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
  const parsedData = JSON.parse(content)
  removeDeps(parsedData, 'dependencies', argv.keep)
  removeDeps(parsedData, 'devDependencies', argv.keep)
  const outputJSON = JSON.stringify(parsedData, null, 2)
  stdout.write(outputJSON)
  stdout.write('\n')
})
