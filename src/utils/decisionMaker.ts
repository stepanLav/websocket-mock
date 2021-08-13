import { metadataInteraction } from "./encoding/encoding"
import { MethodList } from "./Methods"

export interface UserCase {
    method: MethodList,
    changes: {
        matchPattern: string,
        matchedValue: string,
        changeValueInstance: any
    }
}


export class DecisionMaker {

    private idList: number[] = []
    private subscribeList: string[] = []
    private case: UserCase
    private changeMessage: metadataInteraction
    public savedMessage: any

    constructor(current_case: UserCase, changeMessage: metadataInteraction) {
        this.case = current_case
        this.changeMessage = changeMessage
    }

    public fromApp(message: string) {

        let jsonMessage = JSON.parse(message)

        if (!this.matchedMetod(jsonMessage)) return JSON.stringify(jsonMessage)

        if (!this.matchedPattern(jsonMessage)) return JSON.stringify(jsonMessage)

        if (this.isId(jsonMessage)) {
            this.idList.push(jsonMessage.id)
            return JSON.stringify(jsonMessage)
        }

        this.subscribeList.push(jsonMessage.method, jsonMessage.result.subscribe)

        return JSON.stringify(jsonMessage)
    }

    public fromSubstrate(message: string): string {
        let jsonMessage = JSON.parse(message)

        if (this.hasInSubList(jsonMessage)) {
            this.savedMessage = this.changeData(jsonMessage)
        }
        this.hasInIDList(jsonMessage)

        return JSON.stringify(jsonMessage)
    }

    private hasInIDList(jsonMessage: any): boolean {
        if (typeof jsonMessage.result === typeof "") {
            if (this.idList.find(id => id == jsonMessage.id)) {
                this.idList.pop()
                this.subscribeList.push(
                    jsonMessage.result)
                return true
            }
            return false
        }
        if (this.idList.find(id => id == jsonMessage.id)) {
            this.savedMessage = this.changeData(jsonMessage)
            return true
        }
        return false
    }

    private changeData(message: any) {
        if(message.params){
            message.params.result.changes.forEach((element: any[]) => {
                if (element.find(i => i == this.case.changes.matchedValue))
                    element[1] = this.case.changes.changeValueInstance
            })
            return message
        }
        message.result[0].changes.forEach((element: any[]) => {
            if (element.find(i => i == this.case.changes.matchedValue))
                element[1] = this.case.changes.changeValueInstance
        })
        return message
    }

    private hasInSubList(jsonMessage: any): boolean {
        let subscription
        try {
            subscription = this.subscribeList.find(
                sub => sub == jsonMessage.params.subscription)
            if (subscription) return true
            return false
        }
        catch { return false }
    }

    private matchedMetod(jsonMessage: any): boolean {

        if (jsonMessage.method == this.case.method) return true

        return false
    }

    private matchedPattern(jsonMessage: any): boolean {
        const value = jsonMessage.params[0].find(
            (i: string) => i == this.case.changes.matchedValue
        )
        if (value) return true

        return false
    }

    private isId(jsonMessage: any): boolean {
        try {
            jsonMessage.id
            return true
        }
        catch {
            return false
        }
    }
}