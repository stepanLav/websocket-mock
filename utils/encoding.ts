import { initMeta } from '@polkadot/typegen/util'
import { u8aToHex, u8aToString } from '@polkadot/util';

/*
1. Encoding/Decoding metadata.
2. Encoding/Decoding some messages.
*/

export function metadataChange(metadata:string): string {
    let initMetadata = initMeta(metadata)
    const infoMeta = initMetadata.metadata.toHuman()
    const modules = initMetadata.metadata.asLatest.modules[5].get("constants")
    const value = (modules as any)[0].get("value")
    value[0] = 200
    value[1] = 200
    value[3] = 200
    initMetadata.metadata.asLatest.modules[8] = modules as any
    const result = initMetadata.metadata.toHex()
    return result
}

export function messageChange(): string {

    return "Hello!"
}
// metadataChange(responses.kusama_metadata.result)
