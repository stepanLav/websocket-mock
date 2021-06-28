import { readFileSync } from 'fs';
export interface Network {
    url: string
    type: NetworkType
}

export enum NetworkType {
    polkadot = 'polkadot',
    kusama = 'kusama',
    westend = 'westend',
    rococo = 'rococo'
}

export class Polkadot implements Network {
    // url = 'wss://polkadot.api.onfinality.io/public-ws'
    url = 'wss://polkadot.elara.patract.io'
    type = NetworkType.polkadot
    metadata = readFileSync('./src/utils/data/metadata/current/polkadot.json','utf8')
}

export class Kusama implements Network {
    url = 'wss://kusama.api.onfinality.io/public-ws'
    type = NetworkType.kusama
}

export class Westend implements Network {
    url = 'wss://westend.api.onfinality.io/public-ws'
    type = NetworkType.westend
    metadata = readFileSync('./src/utils/data/metadata/current/westend.json','utf8')
}

export class Rococo implements Network {
    url = 'wss://rococo-community-rpc.laminar.codes'
    type = NetworkType.rococo
}