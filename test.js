'use strict';

var path = require('path');
var test = require('tap').test;

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
  });

  var expectedOutput = {
    foo: 'bar',
    baz: 'bat',
    bat: 'man'
  };

  var executable = path.join(__dirname, 'index.js');
  var terminal = require('child_process').spawn(executable);

  var output = '';
  terminal.stdout.on('data', function (data) {
    output += data;
  });

  terminal.on('exit', function (code) {
    var parsedOutput = JSON.parse(output);
    t.equals(code, 0);
    t.same(parsedOutput, expectedOutput);
    t.end();
  });

  terminal.stdin.write(input);
  terminal.stdin.end();
});
