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

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
      console.log('========>>>>>>>>\nReceived Message:\n', message.utf8Data);
      const receive = JSON.parse(message.utf8Data)
      if (receive.method == 'state_subscribeStorage'){
        parseAndSend(subscribe_storage, receive, connection)
      } else if (receive.method == 'chain_subscribeRuntimeVersion'){
        responseBySubscription(state_runtime_version, receive, connection)
      } else if (receive.method == 'system_chain'){
        parseAndSend(networkType, receive, connection)
      } else if (receive.method == 'chain_getBlock'){
        parseAndSend(block, receive, connection)
      } else if (receive.method == 'state_getStorage'){
        parseAndSend(storage, receive, connection)
      }
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});

function parseAndSend(responseJSON, receive, connection) {
    responseJSON.id = receive.id
    const response = JSON.stringify(responseJSON)
    connection.sendUTF(response)
    console.log('<<<<<<<==========\nSend message:\n', response)
}

function responseBySubscription(responseJSON, receive, connection) {
    const response = JSON.stringify(responseJSON)
    connection.sendUTF(response)
    console.log('<<<<<<<==========\nSend message:\nWith subscription!!\n', response)
}

let networkType = {
    jsonrpc: '2.0',
    result: 'Westend',
    id: ''
}

let subscribe_storage = {
    jsonrpc:"2.0",
    result:"IREVgwy0EOGw4lBh",
    id: ''
}

let state_runtime_version = {
    jsonrpc:"2.0",
    method:"state_runtimeVersion",
    params:{
        result:{
            apis:[
                ["0xdf6acb689907609b",3],
                ["0x37e397fc7c91f5e4",1],
                ["0x40fe3ad401f8959a",4],
                ["0xd2bc9897eed08f15",2],
                ["0xf78b278be53f454c",2],
                ["0xaf2c0297a23e6d3d",1],
                ["0xed99c5acb25eedf5",2],
                ["0xcbca25e39f142387",2],
                ["0x687ad44ad37f03c2",1],
                ["0xab3c0572291feb8b",1],
                ["0xbc9d89904f5b923f",1],
                ["0x37c8bb1350a9a2a8",1]
            ],
            authoringVersion:2,
            implName:"parity-westend",
            implVersion:0,
            specName:"westend",
            specVersion:51,
            transactionVersion:4
        },
        subscription:"SlqD1du0j4s8gpHH"
    }
}

let block = {
    jsonrpc:"2.0",
    result:{
        block:{
            extrinsics:["0x280402000be058e6947701"],
            header:{
                digest:{
                    logs:["0x0642414245340201000000625a061000000000",
                    "0x054241424501010e25d96a1d3b4a3bed372e9b16a80b236903f6f8829d14034bf50d6025f353571096fbc6820423b1b3e3ce01fb59856975dee10e045ccd0e20b52a32878df186"
                    ]
                },
            extrinsicsRoot:"0xbcf7c2e3c8512026da13d7432467b582a76667866d152c4d9ab135f9fc6c2cfe",
            number:"0x4264b6",
            parentHash:"0x8936a326787f02d4d3729d98dfd258b1d577794b07f439a37eb55881242614af",
            stateRoot:"0x64a78cfcd356425ef8fa459dad3a9808e55336a97948a3dba8a3e22929915b53"
            }
        },
        justification:null
    },
    id:2127504938
}

let storage = {
    jsonrpc:"2.0",
    result:"0xf00c000001104e2b9477010000",
    id:1468487504
}