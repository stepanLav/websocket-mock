import * as responses from "./response-objects";

const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
server.listen(9899);

const wsServer = new WebSocketServer({
    httpServer: server
});

console.log("==============================================\n"+
"WEB-SOCKET SERVER WAS STARTED !\n"+
"==============================================\n")

wsServer.on('request', function(request: any) {
    const connection = request.accept(null, request.origin);

    connection.on('message', function(message: any) {
      console.log('========>>>>>>>>\nReceived Message:\n', message.utf8Data);
      const receive = JSON.parse(message.utf8Data)
      switch(receive.method) {
        case 'state_subscribeStorage':
            parseAndSend(responses.subscribe_storage, receive, connection)
            break
        case 'chain_subscribeRuntimeVersion':
            responseBySubscription(responses.state_runtime_version, receive, connection)
            break
        case 'system_chain':
            parseAndSend(responses.networkType, receive, connection)
            break
        case 'chain_getBlock':
            parseAndSend(responses.block, receive, connection)
            break
        case 'state_getStorage':
            parseAndSend(responses.storage, receive, connection)
            break
      }
    });
});

function parseAndSend(responseJSON: any, receive: any, connection: any) {
    responseJSON.id = receive.id
    const response = JSON.stringify(responseJSON)
    connection.sendUTF(response)
    console.log('<<<<<<<==========\nSend message:\n', response)
}

function responseBySubscription(responseJSON: any, receive: any, connection: any) {
    const response = JSON.stringify(responseJSON)
    connection.sendUTF(response)
    console.log('<<<<<<<==========\nSend message:\nWith subscription!!\n', response)
}