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
    url = 'wss://polkadot.api.onfinality.io/public-ws'
    type = NetworkType.polkadot
}

export class Kusama implements Network {
    url = 'wss://kusama.api.onfinality.io/public-ws'
    type = NetworkType.kusama
}

export class Westend implements Network {
    url = 'wss://westend.api.onfinality.io/public-ws'
    type = NetworkType.westend
}

export class Rococo implements Network {
    url = 'wss://rococo-community-rpc.laminar.codes'
    type = NetworkType.rococo
}