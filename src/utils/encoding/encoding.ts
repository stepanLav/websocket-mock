import { initMeta } from '@polkadot/typegen/util'
import { Metadata } from '@polkadot/metadata/Metadata'
import { u8aToHex, hexToU8a } from '@polkadot/util'
import { xxhashAsHex } from '@polkadot/util-crypto'
import { TypeRegistry } from '@polkadot/types/create'
import { InterfaceTypes } from '@polkadot/types/types'
import * as fs from "fs";

export class metadataInteraction {

    public metadata: Metadata
    public registry: TypeRegistry

    constructor(metadata: string){
        const initiator = initMeta(metadata)
        this.metadata = initiator.metadata
        this.registry = initiator.registry
    }

    public hexDecode(codec_type:keyof InterfaceTypes, message: any) {
        return this.registry.createType(codec_type, hexToU8a(message)).toString()
    }

    public stringEncode(codec_type:keyof InterfaceTypes, message: any) {
        return u8aToHex(this.registry.createType(codec_type, message).toU8a())
    }

    public storageKeyCreate(message: any) {
        const f = xxhashAsHex('Balances', 128)
        return f
    }


    public changeExistentialBalance(newExistentialDeposit: string) {
        const infoMeta = this.metadata.toJSON()
        const modules = this.metadata.asLatest.modules[5].get("constants")
        let value = (modules as any)[0].get("value")
        console.log(this.registry.createType('Balance', newExistentialDeposit).toHuman())
        value.set(this.registry.createType('Balance', newExistentialDeposit).toU8a())
        const result = this.metadata.toHex()
        return result
    }
}
fs.readFile('src/utils/data/metadata/current/kusama.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const meta = new metadataInteraction(data)
    const balance = meta.hexDecode('Balance', '0x00e87648170000000000000000000000')
    const balance_2 = meta.stringEncode('Balance', '100000000000')
    console.log(balance, balance_2)
  })