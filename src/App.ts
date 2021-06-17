import WebSocket from 'ws';
import { Polkadot } from "./utils"
import { messageToApp, messageToSub } from './utils/decisionMaker';


const port = 8080
const currentNetwork = new Polkadot()

const server = new WebSocket.Server({ port: port })
const client = new WebSocket(currentNetwork.url)

server.on('connection', function connection(socket: any) {

    client.on('open', function open() {
        client.send('ping')
    })

    socket.on('message', function (message: any) {
        console.log('========>>>>>>>>\nReceived from mobile app:\n', message);
        console.log('<<<<<<<<========\nSend to substrate:\n', message);
        client.send(messageToSub(message))
    })

    client.onmessage = function (event) {
        console.log('========>>>>>>>>\nReceived from substrate:\n')
        console.log(event)
        console.log('<<<<<<<<========\nSend to app:\n', event.data)
        socket.send(messageToApp(event.data))
    }
});