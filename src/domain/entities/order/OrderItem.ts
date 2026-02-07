export class OrderItem {
    constructor(
        public readonly productId: string,
        public readonly quantity: number,
        public readonly unitPrice: number
) {
if (quantity <= 0) {
    throw new Error('OrderItem quantity must be greater than zero');
    }

    if (unitPrice < 0) {
        throw new Error('OrderItem unitPrice cannot be negative');
    }
}

get total(): number {
        return this.quantity * this.unitPrice;
    }
}
