export class OrderAlreadyPaid extends Error {
    constructor() {
        super('Order has already been paid');
    }
}

export class OrderNotPayable extends Error {
    constructor() {
        super('Order is not in a payable state');
    }
}

export class OrderNotFulfillable extends Error {
    constructor() {
        super('Order cannot be fulfilled without payment');
    }
}

export class OrderAlreadyFinalized extends Error {
    constructor() {
        super('Order is already finalized');
    }
}
