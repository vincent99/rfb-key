#! /usr/bin/env node

var rfb = require('rfb2');

var MODIFIERS = {
  's': 0xffe1,
  'c': 0xffe3,
  'm': 0xffe7,
  'a': 0xffe9,
};

var argv = require('minimist')(process.argv.slice(2),{default: {
    'host':     null,
    'port':     5900,
    'pass':     null,
    'key':      null,
    'modifier': null,
}});

if ( !argv.key || argv.key.length !== 1 )
{
  console.error('Key must be a single character');
  process.exit(1);
}

var keyCode = argv.key.charCodeAt(0);
var modifierCode = null;

if ( argv.modifier )
{
  modifierCode = MODIFIERS[ argv.modifier.toLowerCase().substr(0,1) ];
}

var r = rfb.createConnection({
  host: argv.host,
  port: argv.port,
  password: argv.pass
});

r.on('connect', function() {
  console.log('Connected to', r.title);

  if ( modifierCode )
  {
    r.keyEvent(modifierCode, 1);
  }

  r.keyEvent(keyCode, 1);

  if ( modifierCode )
  {
    r.keyEvent(modifierCode, 0);
  }

  r.keyEvent(keyCode, 0);

  r.end();
});

