import WebSocket from 'ws';


const server = new WebSocket.Server({ port: 8080 })

const client = new WebSocket('wss://polkadot.elara.patract.io/')

server.on('connection', function connection(socket: any) {

    client.on('open', function open() {
        client.send('ping')
    })

    socket.on('message', function (message: any) {
        console.log('========>>>>>>>>\nReceived from mobile app:\n', message);
        console.log('<<<<<<<<========\nSend to substrate:\n', message);
        client.send(message)
    })

    client.onmessage = function (event) {
        console.log('========>>>>>>>>\nReceived from substrate:\n')
        console.log(event)
        console.log('<<<<<<<<========\nSend to app:\n', event.data)
        socket.send(event.data)
    }
});