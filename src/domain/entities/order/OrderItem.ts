export class OrderItem {
    readonly productId: string;
    readonly quantity: number;
    readonly unitPrice: number;

constructor(params: {
    productId: string;
    quantity: number;
    unitPrice: number;
}) {
    if (params.quantity <= 0) {
        throw new Error('OrderItem.quantity.mustBeGreaterThanZero');
    }

    this.productId = params.productId;
    this.quantity = params.quantity;
    this.unitPrice = params.unitPrice;
}

get subtotal(): number {
    return this.quantity * this.unitPrice;
}
}
