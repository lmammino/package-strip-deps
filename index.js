#!/usr/bin/env node

'use strict';

var stdin = process.stdin;
var stdout = process.stdout;
var content = '';

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
  content += chunk;
});

stdin.on('end', function () {
  var parsedData = JSON.parse(content);
  delete parsedData.dependencies;
  delete parsedData.devDependencies;
  var outputJSON = JSON.stringify(parsedData, null, 2);
  stdout.write(outputJSON);
  stdout.write('\n');
});
