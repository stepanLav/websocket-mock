import { UserCase } from "./decisionMaker"

export enum MethodList{
    'GetMetadata' = 'state_getMetadata',
    'state_subscribeStorage' = 'state_subscribeStorage',
    'state_queryStorageAt' = 'state_queryStorageAt',
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
        changeValueInstance: '0x00000000000000056bc75e2d63100000'
    }
}

export class changeMaxNominatorCount implements UserCase {
    method = MethodList.state_subscribeStorage
    changes = {
        matchPattern: 'prams[0]',
        matchedValue: '0x5f3e4907f716ac89b6347d15ececedcad642c00af119adf30dc11d32e9f0886d',
        changeValueInstance: '0xf4010000'
    }
}

export class changeIdentity implements UserCase {
    method = MethodList.state_queryStorageAt
    changes = {
        matchPattern: 'prams[0]',
        matchedValue: '0x2aeddc77fe58c98d50bd37f1b90840f9cd7f37317cd20b61e9bd46fab87047149527fd62e8426b967a28037947ecebe0dd86dc0e910911cb33185fd0714b37b75943f67dcf9b6e7c',
        changeValueInstance: null
    }
}

export class stakingerasTotalStake_EraIndex implements UserCase {
    method = MethodList.state_queryStorageAt
    changes = {
        matchPattern: 'prams[0]',
        matchedValue: '0x5f3e4907f716ac89b6347d15ececedcaab6a212bc08a5603828f33f90ec4a1394f0f0dc89f14ad14767f36484b1e2acf5c265c7a64bfb46e95259c66a8189bbcd216195def436852',
        changeValueInstance: "0x6bd1d6bc0400000000000000000000004557a43c000000000000000000000000"
    }
}

export class makeValidatorsSlashed implements UserCase {
    method = MethodList.state_queryStorageAt
    changes = {
        matchPattern: 'prams[0]',
        matchedValue: "0x5f3e4907f716ac89b6347d15ececedcaab6a212bc08a5603828f33f90ec4a1395c69b53821debaa39ae581fef1fc06828723715731adcf810e42ce4dadad629b1b7fa5c3c144a81d",
        changeValueInstance: "0x010000003b0f0000380f0000041d000000"
    }
}

export class addRewards implements UserCase {
    method = MethodList.state_queryStorageAt
    changes = {
        matchPattern: 'prams[0]',
        matchedValue: "0x",
        changeValueInstance: "0x010000003b0f0000380f0000041d000000"
    }
}