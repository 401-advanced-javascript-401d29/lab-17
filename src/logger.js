'use strict';

const net = require('net');
const client = new net.Socket();

client.connect(3001, 'localhost', () => {});

/**
 * Listens for a data event
 */
client.on('data', (payload) => {
  console.log('Got some data:', payload);
});

/**
 * Listens for a close event
 */
client.on('close', () => {
  console.log('Connection Closed');
});