import { OrderItem } from './OrderItem';
import { OrderStatus } from './OrderStatus';
import {
    OrderAlreadyFinalizedError,
    OrderCannotBeFulfilledError,
} from './OrderErrors';

export class Order {
    private status: OrderStatus;
    private readonly items: OrderItem[];
    private readonly createdAt: Date;

    private constructor(items: OrderItem[]) {
        this.items = items;
        this.status = OrderStatus.Created;
        this.createdAt = new Date();
    }

    static create(items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error('Order.mustHaveAtLeastOneItem');
        }
        return new Order(items);
    }

    requestPayment(): void {
        if (this.status !== OrderStatus.Created) {
            throw new OrderAlreadyFinalizedError();
        }
        this.status = OrderStatus.PaymentPending;
    }

    confirmPayment(): void {
        if (this.status !== OrderStatus.PaymentPending) {
            throw new Error('Order.paymentNotPending');
        }
        this.status = OrderStatus.Paid;
    }

    fail(): void {
        if (this.status === OrderStatus.Fulfilled) {
            throw new Error('Order.alreadyFulfilled');
        }
        this.status = OrderStatus.Failed;
    }

    fulfill(): void {
        if (this.status !== OrderStatus.Paid) {
            throw new OrderCannotBeFulfilledError();
        }
        this.status = OrderStatus.Fulfilled;
    }

    getTotalAmount(): number {
        return this.items.reduce((sum, item) => sum + item.subtotal, 0);
    }

    getStatus(): OrderStatus {
        return this.status;
    }
}
