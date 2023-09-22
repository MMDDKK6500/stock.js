//404 not found any stocks to sell
// 401 unauthorized (Wrong password)
// 403 not enough money
// 200 bought the stocks

export class StockStatus {
    constructor(public message: string, public code: number) {}
}