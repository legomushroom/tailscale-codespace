const udp = require('dgram');

const DEFAULT_PORT = 81;
const DEFAULT_HOST = '0.0.0.0';

const argsPort = process.argv[2];
const port = parseInt(`${argsPort ?? DEFAULT_PORT}`, 10);
if (isNaN(port)) {
  throw new Error(`Cannot parse the port: '${argsPort}'`);
}

const host = process.argv[3] ?? DEFAULT_HOST;

// creating a udp server
const server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error', function (error) {
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message', function (msg, info) {
  console.log(`\n-> data received from [${info.address}:${info.port}]: \"${msg}\"`);

  // sending msg
  server.send(msg, info.port, info.address, (error) => {
    if (error) {
        client.close();
        console.error('cannot send message to client', error);
    }

    console.log(`<- sent to [${info.address}:${info.port}]: \"${msg}\"`);
  });
});

// emits when socket is ready and listening for datagram msgs
server.on('listening', function () {
    const address = server.address();
    const port = address.port;
    const family = address.family;
    const ipaddr = address.address;

    console.log('Server is listening at port ' + port);
    console.log('Server ip: ' + ipaddr);
    console.log('Server is IP4/IP6: ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close', function () {
  console.log('socket is closed');
});

server.bind(port, host);
