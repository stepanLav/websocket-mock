export enum networks {
    kusama = "kusama",
    westend = "westend",
    polkadot = "polkadot",
    sora = "sora"
}

export enum metadataType {
    old = "old",
    broken = "broken",
    current = "current"
}

export function getNetworkType(network: networks): JSON {
    const networkJson = require(`./data/networkType/${network}.json`)
    return networkJson
}

export function responseConstructor(result: string | number | boolean = 'IRGVgwy0EOGw4lBh'): JSON {
    const response = `{jsonrpc: "2.0",result: ${result},id: ''}`
    return JSON.parse(response)
}

export function getRuntimeVersion(network: networks, version: number, byID = false) {
    let networkJson
    if (byID) {
        networkJson = require(`./data/stateRuntimeVersion/versionByID/${network}.json`)
        networkJson.params.result.specVersion = version
        return networkJson
    }
    networkJson = require(`./data/stateRuntimeVersion/${network}.json`)
    networkJson.params.result.specVersion = version
    return networkJson
}

export function getBlock() {
    const block = require("./data/blocks/block.json")
    return block
}

export function getMetadata(network: networks, metadataType: metadataType): JSON {
    const metadata = require(`./data/metadata/${metadataType}/${network}.json`)
    return metadata
}

export function ping(isSyncing = false, peers = 58, shouldHavePeers = true){
    const result = `{ isSyncing: ${isSyncing}, peers: ${peers}, shouldHavePeers: ${shouldHavePeers} }`
    return result
}

export function feeConstructor (partialFee: string = "150000016", classFee: string = "normal", weight: number = 202714000): string {
    const fee = `{ class: ${classFee}, partialFee: ${partialFee}, weight: ${weight} }`
    return fee
}

export function keysPaged(): string {
    const result = `["0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0f124ff49d7a093b7e30d000003adc196911e491e08264834504a64ace1373f0c8ed5d57381ddf54a2f67a318fa42b1352681606d","0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0f124ff49d7a093b7e30d00004245138345ca3fd8aebb0211dbb07b4d335a657257b8ac5e53794c901e4f616d4a254f2490c43934","0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0f124ff49d7a093b7e30d00004b3f0cabbeca763d0e1dc250d6ae40439eea676bb4b0023a6aa99f902e174d70d31fb06b0899d60c","0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0f124ff49d7a093b7e30d00005c69b53821debaa39ae581fef1fc06828723715731adcf810e42ce4dadad629b1b7fa5c3c144a81d","0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0f124ff49d7a093b7e30d00006318d50a26d00c113e33e5b0cb049ab36ed75f1ab83baf81a2fc5d5bb6d2f6c3283642a49b155d13","0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0f124ff49d7a093b7e30d00007bbbb11172fc426abedeb75f75809a9d5ca347ab1449ac09e66a634146fc1c42a4978c167935216d","0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0f124ff49d7a093b7e30d000094db6df098736e95807fa1d37f6c49b486914202ab2ca15db28def3d7480a787a5839dfcf1d38518","0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0f124ff49d7a093b7e30d0000a50cb0f7f02bfc949c71265aea33241e78b67d2740d8f54d86016e13830e8bce23107d526b34cf7f","0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0f124ff49d7a093b7e30d0000ce6a96a3775ab416f268995cc38974ce0686df1364875f26f2c32b246ddc18835512c3f9969f5836","0x5f3e4907f716ac89b6347d15ececedca682db92dde20a10d96d00ff0e9e221c0f124ff49d7a093b7e30d0000d1ff4f1222b63b7e5eb5ea7ece95296124c169040346253651175b8f046dcaaf7071d4279e24c80a"]`
    return result
}