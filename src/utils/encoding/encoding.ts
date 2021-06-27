import { initMeta } from '@polkadot/typegen/util'
import { Metadata } from '@polkadot/metadata/Metadata';
import { TypeRegistry } from '@polkadot/types/create';
import { UserCase } from '../decisionMaker';
import { UInt } from '@polkadot/types'
import { hexToBn } from '@polkadot/util'

export class metadataInteraction {

    public metadata: Metadata
    public registry: TypeRegistry
    public case: UserCase

    constructor(metadata: string, currentCase: UserCase){
        const initiator = initMeta(metadata)
        this.metadata = initiator.metadata
        this.registry = initiator.registry
        this.case = currentCase
    }

    public changeMinNominatorBound() {
        const infoMeta = this.metadata.toHuman()
        const modules = this.metadata.asLatest.modules[5].get("constants")
        console.log('Change it!')
        const value = (modules as any)[0].get("value")
        value[0] = 200
        value[1] = 200
        value[3] = 200
        const result = this.metadata.toHex()
        return result
    }
}