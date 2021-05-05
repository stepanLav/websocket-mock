import {
    getNetworkType,
    responseConstructor,
    networks,
    getRuntimeVersion,
    getBlock,
    getMetadata,
    metadataType,
    ping,
    feeConstructor,
    keysPaged
} from "./utils/getters"
import { Server } from "./utils/server"


const server = new Server(networks.kusama, 9899, 2031)

server.wsServer.on('request', function (request: any) {
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
                server.setIdAndAnswered(responseConstructor(), receive, connection)
                break
            case 'chain_getBlock':
                server.setIdAndAnswered(responseConstructor(getBlock()), receive, connection)
                break
            case 'state_getStorage':
                server.setIdAndAnswered(responseConstructor("0xf00c000001104e2b9477010000"), receive, connection)
                break
            case 'payment_queryInfo':
                server.setIdAndAnswered(responseConstructor(feeConstructor()), receive, connection)
                break
            case 'system_accountNextIndex':
                server.setIdAndAnswered(responseConstructor(7), receive, connection)
                break
            case 'state_getKeysPaged':
                server.setIdAndAnswered(responseConstructor(keysPaged()), receive, connection)
                break

            //Connection
            case 'system_chain':
                server.setIdAndAnswered(getNetworkType(server.network), receive, connection)
                break

            //Runtime version
            case 'chain_getRuntimeVersion':
                server.setIdAndAnswered(getRuntimeVersion(server.network, server.runtimeVersion, true), receive, connection)
                break
            case 'chain_subscribeRuntimeVersion': //Android
                server.subscribe(responseConstructor(), receive, connection, receive.method, getRuntimeVersion(server.network, server.runtimeVersion))
                break
            case 'state_subscribeRuntimeVersion': //iOS
                server.subscribe(responseConstructor(), receive, connection, receive.method, getRuntimeVersion(server.network, server.runtimeVersion))
                break

            //Metadata
            case 'state_getMetadata':
                console.log('<<<<<<<==========\nGet Metadata!!!!!!!!!!!!!!!!!!!!!!!!!!\n')
                server.setIdAndAnswered(getMetadata(server.network, metadataType.current, true), receive, connection)
                break

            //Sora specific cases
            case 'irohaMigration_needsMigration':
                server.setIdAndAnswered(responseConstructor(true), receive, connection)
                break

            //Ping-Pong
            case 'system_health':
                server.setIdAndAnswered(ping(), receive, connection)
                break
        }
    });
});