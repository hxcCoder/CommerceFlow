export class OrderAlreadyPaidError extends Error {
    constructor() {
    super('Order.alreadyPaid');
}
}

export class OrderCannotBeFulfilledError extends Error {
    constructor() {
        super('Order.cannotBeFulfilledWithoutPayment');
}
}

export class OrderAlreadyFinalizedError extends Error {
    constructor() {
        super('Order.isFinalized');
}
}
