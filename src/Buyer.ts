import { Company } from "./Company"
import { Share } from "./Share"
import { sha256 } from 'hash.js'
import { StockStatus } from "./StockStatus"

export class Buyer {
    public shares: Share[] = []
    public money: number = 1000000000
    private key = ""
    
    constructor(public name: string, private password: string) {
        this.key = sha256().update(this.password).digest('hex')
        this.password = ""
    }

    checkPassword(password: string) {
        if (sha256().update(password).digest('hex') === this.key) return false
        else return true
    }

    getShares(password: string) {
        if (this.checkPassword(password)) return new StockStatus("Wrong password", 401)
        return this.shares
    }

    getMoney(password: string) {
        if (this.checkPassword(password)) return new StockStatus("Wrong password", 401)
        return this.money
    }

    changePassword(oldPassword: string, newPassword: string) {
        if (this.checkPassword(oldPassword)) return new StockStatus("Wrong password", 401)
        this.key = sha256().update(newPassword).digest('hex')
    }
}