'use strict';

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};
let allowedEvents = ['saveComplete', 'errorEvent'];

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  console.log('Welcome to the server', id);
  socketPool[id] = socket;
  socket.on('data', dispatchEvent);
  socket.on('close', () => {
    console.log(`Goodbye ${id}`);
    delete socketPool[id];
  });
});

let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  // console.log('text', text);
  /**
   * takes a line of text and divides into an event and text
   */
  let [event, payload] = text.split(/\s+(.*)/);
  // console.log('Event', event, 'Payload', payload);
  if ( allowedEvents.includes(event) ) {
    console.log(`EVENT HAPPENED: ${event}`);
    for (let socket in socketPool) {
      socketPool[socket].write(`${event} ${payload}`);
      console.log(buffer);
    }
  } else {
    console.log(`EVENT NOT FOUND: ${event}`);
  }
};

//4/9/2019 - Class 16 video

