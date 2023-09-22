import { Company } from './Company';
import { Share } from "./Share"
import { Buyer } from "./Buyer";

let apple = new Company("Apple")
let me = new Buyer("Me", "1234")

console.log(apple.buyStocks(10, me, "1234"))
console.log(me.shares)
console.log(apple.sharesAvailable)
console.log(apple.sellStocks(10, me, "1234"))
console.log(me.shares)
console.log(apple.sharesAvailable)