import { randomInt } from "crypto";
import { Buyer } from "./Buyer";
import { Share } from "./Share";
import { StockStatus } from "./StockStatus";

export class Company {
    public shares: number = 0
    public sharesAvailable: number = 0
    public price: number = 0
    public shareholders: Buyer[] = []

    constructor(public name: string) {
        this.shares = randomInt(100, 500)
        this.price = randomInt(10, 5000)
        this.sharesAvailable = this.shares
    }

    buyStocks(amount: number, buyer: Buyer, password: string) {
        if (buyer.checkPassword(password)) return new StockStatus("Wrong password", 401)
        if (this.sharesAvailable >= amount && buyer.money >= this.price * amount) {
            this.sharesAvailable -= amount
            this.shareholders.push(buyer)
            buyer.shares.push(new Share(this, amount, buyer))
            return new StockStatus(`Succefully bought ${amount} stocks for ${this.price * amount} from ${this.name}`, 200)
        }
    }

    sellStocks(amount: number, buyer: Buyer, password: string) {
        if (buyer.checkPassword(password)) return new StockStatus("Wrong password", 401)
        if (buyer.shares.find(share => share.company === this) == undefined) {
            return new StockStatus("You don't have any stocks from this company", 404)
        }
        if (buyer.shares.find(share => share.company === this)!.amount >= amount) {
            this.sharesAvailable += amount
            if (buyer.shares.find(share => share.company === this)!.amount === 0) {
                buyer.shares.splice(buyer.shares.indexOf(buyer.shares.find(share => share.company === this)!), 1)
                this.shareholders.splice(this.shareholders.indexOf(buyer), 1)
            } else {
                buyer.shares.find(share => share.company === this)!.amount -= amount
            }
            if (buyer.shares.find(share => share.company === this)!.amount === 0) {
                buyer.shares.splice(buyer.shares.indexOf(buyer.shares.find(share => share.company === this)!), 1)
            }
            return new StockStatus(`Succefully sold ${amount} stocks for ${this.price * amount} from ${this.name}`, 200)
        }
    }

    getTotalShares() {
        return this.shares
    }

    getSharesAvailable() {
        return this.sharesAvailable
    }

    getPrice() {
        return this.price
    }

    getShareholders() {
        return this.shareholders
    }

    getShareholdersCount() {
        return this.shareholders.length
    }
}