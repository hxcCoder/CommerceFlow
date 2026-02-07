import { OrderItem } from './OrderItem';
import { OrderStatus } from './OrderStatus';
import {
    OrderAlreadyFinalized,
    OrderAlreadyPaid,
    OrderNotFulfillable,
    OrderNotPayable,
} from './OrderErrors';
import { PaymentResult } from '../payment/PaymentResult';
import { PaymentStatus } from '../payment/PaymentStatus';

export class Order {
    private status: OrderStatus;
    private readonly items: OrderItem[];
    private readonly createdAt: Date;

constructor(
    public readonly id: string,
    items: OrderItem[]
) {
    if (items.length === 0) {
        throw new Error('Order must contain at least one item');
    }

    this.items = items;
    this.status = OrderStatus.Created;
    this.createdAt = new Date();
}

getStatus(): OrderStatus {
    return this.status;
}

getItems(): OrderItem[] {
    return [...this.items];
}

getTotalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
}

requestPayment(): void {
    if (this.status !== OrderStatus.Created) {
        throw new OrderNotPayable();
    }

    this.status = OrderStatus.PaymentPending;
}

applyPayment(result: PaymentResult): void {
    if (this.status === OrderStatus.Paid) {
        throw new OrderAlreadyPaid();
    }

    if (this.status === OrderStatus.Failed || this.status === OrderStatus.Fulfilled) {
        throw new OrderAlreadyFinalized();
    }

    if (result.status === PaymentStatus.APPROVED) {
        this.status = OrderStatus.Paid;
    } else if (result.status === PaymentStatus.REJECTED) {
        this.status = OrderStatus.Failed;
    }
}

fulfill(): void {
    if (this.status !== OrderStatus.Paid) {
        throw new OrderNotFulfillable();
    }

    this.status = OrderStatus.Fulfilled;
}
}
