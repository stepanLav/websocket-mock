import { UserCase } from "./decisionMaker"

export enum MethodList{
    'GetMetadata' = 'state_getMetadata',
    'state_subscribeStorage' = 'state_subscribeStorage',
    'SomethingElse' = ''
}

export class changeMetadataCase implements UserCase {
    method = MethodList.GetMetadata
    changes = {
        matchPattern: 'method',
        matchedValue: '',
        changeValueInstance: '',
    }
}

export class changeMinNomBound implements UserCase {
    method = MethodList.state_subscribeStorage
    changes = {
        matchPattern: 'prams[0]',
        matchedValue: '0x5f3e4907f716ac89b6347d15ececedcaed441ceb81326c56263efbb60c95c2e4',
        changeValueInstance: '0x00407a10f35a00000000000000000000'
    }
}

export class changeMaxNominatorCount implements UserCase {
    method = MethodList.state_subscribeStorage
    changes = {
        matchPattern: 'prams[0]',
        matchedValue: '0x5f3e4907f716ac89b6347d15ececedcad642c00af119adf30dc11d32e9f0886d',
        changeValueInstance: '0x5e630000'
    }
}