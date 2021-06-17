export interface Case {
    case: Cases,
    case_message: string
}

export enum Cases{
    changeMetadata = "changeMetadata",
    state_getKeysPaged = "state_getKeysPaged"
}

export function messageToSub(message: string): any{
    return selectCase(message).case_message
}

export function messageToApp(message: any): any {
    return message
}


function selectCase(message: string): Case {
    let return_value = {
        case_message: message
    } as Case
    const parseMessage = JSON.parse(message)

    switch (parseMessage.method){
        case Cases.changeMetadata:
            return return_value
        case Cases.state_getKeysPaged:
            parseMessage.params[1] = 1
            return_value.case_message = JSON.stringify(parseMessage)
            return return_value
        default:
            return return_value
    }
}