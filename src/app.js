'use strict';

const fs = require('fs');
const net = require('net');
const util = require('util');
const client = new net.Socket();

client.connect(3001, 'localhost', () => {});

let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);



const alterFile = (file) => {
  readFile(file)
    .then(data => {
      let text = Buffer.from(data.toString().toUpperCase());
      return writeFile(file, text);
    })
    .then(() => {
      console.log('file saved log');
      client.write(`saveComplete ${file}`);
      client.end();
    })
    .catch(error => client.write(`eventError ${error}`));

};

let file = process.argv.slice(2).shift();

alterFile(file);
