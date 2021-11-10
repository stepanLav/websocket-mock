import * as encode from "./encoding";
import { networks } from "./getters";



export class Server {

    private subscriptionParameters = new Map<string, string>()
    private port

    public network
    public runtimeVersion
    public wsServer

    constructor(network: networks, port: number, runtimeVersion: number) {
        this.network = network
        this.port = port
        this.runtimeVersion = runtimeVersion
        this.wsServer = this.connection()
    }

    private connection(): any {
        const http = require('http')
        const WebSocketServer = require('websocket').server

        const server = http.createServer()
        server.listen(this.port)

        const wsServer = new WebSocketServer({
            httpServer: server
        })
        console.log(`\n==============================================\nWS-SERVER of NETWORK: ${this.network}, runtime: ${this.runtimeVersion}\nWAS STARTED! \n port = ${this.port}\n==============================================\n`)
        return wsServer
    }

    public setIdAndAnswered(responseJSON: any, receive: any, connection: any) {
        responseJSON.id = receive.id
        const response = JSON.stringify(responseJSON)
        connection.sendUTF(response)
        console.log('<<<<<<<==========\nSend message:\n', response)
    }

    public subscribe(responseJSON: any, receive: any, connection: any, method: any, subscribeAnswer: any) {
        const subscriptionCode = Math.random().toString(36).substring(7);
        responseJSON.id = receive.id
        responseJSON.result = subscriptionCode
        this.subscriptionParameters.set(method, subscriptionCode)
        const response = JSON.stringify(responseJSON)
        connection.sendUTF(response)
        console.log('<<<<<<<==========\nSend message:\nSubscribe!!\n', response)
        this.sendSubscriptionMessage(method, subscribeAnswer, connection)
    }

    private sendSubscriptionMessage(method: any, subscribeAnswer: any, connection: any) {
        subscribeAnswer.params.subscription = this.subscriptionParameters.get(method)
        const response = JSON.stringify(subscribeAnswer)
        connection.sendUTF(response)
        console.log('<<<<<<<==========\nSend message:\nFor subscription!!\n' + subscribeAnswer.params.subscription, response)
        this.subscriptionParameters.delete(method)
    }

}