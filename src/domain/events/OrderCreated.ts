export class OrderCreated {
    readonly occurredAt = new Date();

    constructor(
    public readonly orderId: string,
    public readonly totalAmount: number
) {}
}
