import * as encode from "./utils/encoding"
import { getNetworkType, responseConstructor, networks, getRuntimeVersion, getBlock, getMetadata, metadataType, ping, feeConstructor, keysPaged } from "./utils/getters"

const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
server.listen(9899);

let subscriptionParameters = new Map<string, string>()


const network = networks.westend
const versionRuntime = 51

const wsServer = new WebSocketServer({
    httpServer: server
});

console.log("==============================================\n" +
    "WEB-SOCKET SERVER WAS STARTED !\n" +
    "==============================================\n")

wsServer.on('request', function (request: any) {
    const connection = request.accept(null, request.origin);

    connection.on('message', function (message: any) {
        let receive
        if (message.type == 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            let str = new TextDecoder().decode(message.binaryData)
            console.log('========>>>>>>>>\nConvert Message from Binary:\n', str)
            receive = JSON.parse(str)
        } else {
            console.log('========>>>>>>>>\nReceived Message:\n', message.utf8Data);
            receive = JSON.parse(message.utf8Data)
        }
        switch (receive.method) {
            case 'state_subscribeStorage':
                setIdAndAnswered(responseConstructor(), receive, connection)
                break
            case 'chain_subscribeRuntimeVersion': //Android
                subscribe(responseConstructor(), receive, connection, receive.method, getRuntimeVersion(network, versionRuntime))
                break
            case 'state_subscribeRuntimeVersion': //iOS
                subscribe(responseConstructor(), receive, connection, receive.method, getRuntimeVersion(network, versionRuntime))
                break
            case 'system_chain':
                setIdAndAnswered(getNetworkType(network), receive, connection)
                break
            case 'chain_getBlock':
                setIdAndAnswered(responseConstructor(getBlock()), receive, connection)
                break
            case 'state_getStorage':
                setIdAndAnswered(responseConstructor("0xf00c000001104e2b9477010000"), receive, connection)
                break
            case 'state_getMetadata':
                console.log('<<<<<<<==========\nGet Metadata!!!!!!!!!!!!!!!!!!!!!!!!!!\n')
                setIdAndAnswered(getMetadata(network, metadataType.old), receive, connection, true)
                break
            case 'system_health':
                setIdAndAnswered(ping(), receive, connection)
                break
            case 'payment_queryInfo':
                setIdAndAnswered(responseConstructor(feeConstructor()), receive, connection)
            case 'system_accountNextIndex':
                setIdAndAnswered(responseConstructor(7), receive, connection)
            case 'chain_getRuntimeVersion':
                setIdAndAnswered(getRuntimeVersion(network, versionRuntime, true), receive,  connection)
            case 'state_getKeysPaged':
                setIdAndAnswered(responseConstructor(keysPaged()), receive, connection)
            case 'irohaMigration_needsMigration':
                setIdAndAnswered(responseConstructor(true), receive, connection)
        }
    });
});

function setIdAndAnswered(responseJSON: any, receive: any, connection: any, change_result?:boolean) {
    responseJSON.id = receive.id
    if(change_result){
        responseJSON.result = encode.metadataChange(responseJSON.result)
    }
    const response = JSON.stringify(responseJSON)
    connection.sendUTF(response)
    console.log('<<<<<<<==========\nSend message:\n', response)
}

function subscribe(responseJSON: any, receive: any, connection: any, method: any, subscribeAnswer: any) {
    const subscriptionCode = Math.random().toString(36).substring(7);
    responseJSON.id = receive.id
    responseJSON.result = subscriptionCode
    subscriptionParameters.set(method, subscriptionCode)
    const response = JSON.stringify(responseJSON)
    connection.sendUTF(response)
    console.log('<<<<<<<==========\nSend message:\nSubscribe!!\n', response)
    sendSubscriptionMessage(method, subscribeAnswer, connection)
}

function sendSubscriptionMessage(method: any, subscribeAnswer: any, connection: any) {
    subscribeAnswer.params.subscription = subscriptionParameters.get(method)
    const response = JSON.stringify(subscribeAnswer)
    connection.sendUTF(response)
    console.log('<<<<<<<==========\nSend message:\nFor subscription!!\n' + subscribeAnswer.params.subscription, response)
    subscriptionParameters.delete(method)
}