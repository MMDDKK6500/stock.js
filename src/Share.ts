import { Buyer } from "./Buyer";
import { Company } from "./Company";

export class Share {
    constructor(public company: Company, public amount: number, owner: Buyer) {
    }
}