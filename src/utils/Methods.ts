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
        matchedValue: '0x00e40b54020000000000000000000000',
        changeValueInstance: '0x00204aa9d10100000000000000000000',
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

export class changeTotalIssuance implements UserCase {
    method = MethodList.state_subscribeStorage
    changes = {
        matchPattern: 'prams[0]',
        matchedValue: '0xc2261276cc9d1f8598ea4b6a74b15c2f57c875e4cff74148e4628f264b974c80',
        changeValueInstance: '0x20b97a7d6026809c0000000000000000'
    }
}

export class changeBalance implements UserCase {
    method = MethodList.state_subscribeStorage
    changes = {
        matchPattern: 'prams[0]',
        matchedValue: '0x26aa394eea5630e07c48ae0c9558cef7b99d880ec681799c0cf30e8886371da9761d8652b700f2b7cb1e8c73a3f3bd39560776dea22129708cbe73d369674211751082266684a043bcd498012cd49708',
        changeValueInstance: '0x50000000020000000100000000000000ffffcf1309468e150100000000000000ff7ff420e6b50000000000000000000000b4b30203060000000000000000000000b4b302030600000000000000000000'
    }
}