import { Order } from '../Order';
import { OrderItem } from '../OrderItem';
import { OrderStatus } from '../OrderStatus';

describe('Order Entity', () => {
    it('creates an order in CREATED state', () => {
        const item = new OrderItem({
            productId: 'p1',
            quantity: 2,
            unitPrice: 100,
    });
    
    const order = Order.create([item]);

    expect(order.getStatus()).toBe(OrderStatus.Created);
    expect(order.getTotalAmount()).toBe(200);
});

it('moves to PAYMENT_PENDING when payment is requested', () => {
    const order = Order.create([
        new OrderItem({ productId: 'p1', quantity: 1, unitPrice: 50 }),
    ]);

    order.requestPayment();

    expect(order.getStatus()).toBe(OrderStatus.PaymentPending);
});

it('cannot be fulfilled without payment', () => {
    const order = Order.create([
        new OrderItem({ productId: 'p1', quantity: 1, unitPrice: 50 }),
    ]);

    expect(() => order.fulfill()).toThrow();
});
});
