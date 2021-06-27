import WebSocket from 'ws';
import { Kusama, Polkadot, Westend } from "./utils"
import { UserCase, DecisionMaker } from './utils/decisionMaker';
import { metadataInteraction } from './utils/encoding/encoding';
import { changeMaxNominatorCount, changeMetadataCase, changeMinNomBound } from './utils/Methods';


const port = 8080
const currentNetwork = new Westend()

const server = new WebSocket.Server({ port: port })
const client = new WebSocket(currentNetwork.url)
const currentCase = new changeMaxNominatorCount()
const currentMetadata = new metadataInteraction(currentNetwork.metadata, currentCase)
const messageProcessing = new DecisionMaker(currentCase, currentMetadata)

server.on('connection', function connection(socket: any) {

    try {
        client.on('open', function open() {
            client.send('ping')
        })
    }
    catch {
        console.log('Ops!')
    }

    socket.on('message', function (message: any) {
        console.log('========>>>>>>>>\nReceived from mobile app:\n', message);
        const toSubstrate = messageProcessing.fromApp(message)
        console.log('<<<<<<<<========\nSend to substrate:\n', toSubstrate);
        client.send(toSubstrate)
    })

    client.onmessage = function (event) {
        console.log('========>>>>>>>>\nReceived from substrate:\n')
        console.log(event)
        const messageToApp = messageProcessing.fromSubstrate(event.data.toString())
        console.log('<<<<<<<<========\nSend to app:\n', messageToApp)
        socket.send(messageToApp)
    }
});