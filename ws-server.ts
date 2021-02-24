import * as responses from "./response-objects";

const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
server.listen(9899);

let subscriptionParameters = new Map<string, string>()


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
                setIdAndAnswered(responses.subscribe_storage, receive, connection)
                break
            case 'chain_subscribeRuntimeVersion': //Android
                subscribe(responses.subscribe_storage, receive, connection, receive.method, responses.state_runtime_version_current_westend)
                break
            case 'state_subscribeRuntimeVersion': //iOS
                subscribe(responses.subscribe_storage, receive, connection, receive.method, responses.state_runtime_sora)
                break
            case 'system_chain':
                setIdAndAnswered(responses.networkType, receive, connection)
                break
            case 'chain_getBlock':
                setIdAndAnswered(responses.block, receive, connection)
                break
            case 'state_getStorage':
                setIdAndAnswered(responses.storage, receive, connection)
                break
            case 'state_getMetadata':
                console.log('<<<<<<<==========\nGet Metadata!!!!!!!!!!!!!!!!!!!!!!!!!!\n')
                setIdAndAnswered(responses.sora_metadata, receive, connection)
                break
            case 'system_health':
                setIdAndAnswered(responses.ping_receive, receive, connection)
                break
        }
    });
});

function setIdAndAnswered(responseJSON: any, receive: any, connection: any) {
    responseJSON.id = receive.id
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