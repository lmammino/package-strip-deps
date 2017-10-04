'use strict'

var childProcess = require('child_process')
var path = require('path')
var test = require('tap').test

test('it should strip "dependencies" and "devDependencies" from an input JSON', function (t) {
  var input = JSON.stringify({
    foo: 'bar',
    baz: 'bat',
    bat: 'man',
    dependencies: {
      somedep: '1.2.3',
      somedep2: '2.3.4'
    },
    devDependencies: {
      somedep3: '3.4.5',
      somedep4: '6.7.8'
    }
  })

  var expectedOutput = {
    foo: 'bar',
    baz: 'bat',
    bat: 'man',
    dependencies: {},
    devDependencies: {}
  }

  var executable = path.join(__dirname, 'index.js')
  var terminal = childProcess.spawn(executable)

  var output = ''
  terminal.stdout.on('data', function (data) {
    output += data
  })

  terminal.on('exit', function (code) {
    var parsedOutput = JSON.parse(output)
    t.equals(code, 0)
    t.same(parsedOutput, expectedOutput)
    t.end()
  })

  terminal.stdin.write(input)
  terminal.stdin.end()
})

test('it should keep packages when the "keep" option is used', function (t) {
  var input = JSON.stringify({
    foo: 'bar',
    baz: 'bat',
    bat: 'man',
    dependencies: {
      somedep: '1.2.3',
      somedep2: '2.3.4',
      somedep3: '3.4.5',
      somedep4: '6.7.8'
    }
  })

  var expectedOutput = {
    foo: 'bar',
    baz: 'bat',
    bat: 'man',
    dependencies: {
      somedep2: '2.3.4',
      somedep3: '3.4.5'
    }
  }

  var executable = path.join(__dirname, 'index.js')
  var terminal = childProcess.spawn(executable, ['--keep', 'somedep2', '--keep', 'somedep3'])

  var output = ''
  terminal.stdout.on('data', function (data) {
    output += data
  })

  terminal.on('exit', function (code) {
    var parsedOutput = JSON.parse(output)
    t.equals(code, 0)
    t.same(parsedOutput, expectedOutput)
    t.end()
  })

  terminal.stdin.write(input)
  terminal.stdin.end()
})
