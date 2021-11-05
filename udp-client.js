
const udp = require('dgram');
const buffer = require('buffer');

// creating a client socket
const client = udp.createSocket('udp4');

const host = process.argv[2];

const argsPort = process.argv[3];
const port = parseInt(`${argsPort ?? DEFAULT_PORT}`, 10);
if (isNaN(port)) {
  throw new Error(`Cannot parse the port: "${argsPort}"`);
}

// buffer msg
const data = Buffer.from('halllooO!');

client.on('message', (msg, info) => {
  console.log(`-> data received from [${info.address}:${info.port}]: \"${msg}\"`);
});

// sending msg
client.send(data, port, host, (error) => {
    if (error) {
        client.close();
        console.error('cannot send message to client', error);
    }

    console.log(`<- sent to [${host}:${port}]: \"${data}\"`);
});

const data1 = Buffer.from('hello');
const data2 = Buffer.from('world');

// sending multiple msg
client.send([data1, data2], port, host, (error) => {
    if (error) {
        client.close();
        console.error('cannot send message to client', error);
    }

    console.log(`<- sent to [${host}:${port}]: \"${data1}\", \"${data2}\"`);
});

// console.log('\n');
