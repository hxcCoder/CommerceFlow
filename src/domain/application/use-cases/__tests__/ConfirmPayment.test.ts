import { ConfirmPayment } from '../ConfirmPayment';
import { InMemoryOrderRepository } from './fakes/InMemoryOrderRepository';
import { InMemoryEventPublisher } from './fakes/InMemoryEventPublisher';
import { Order } from '../../../entities/order/Order';
import { OrderItem } from '../../../entities/order/OrderItem';
import { OrderStatus } from '../../../entities/order/OrderStatus';
import { PaymentResult } from '../../../entities/payment/PaymentResult';
import { PaymentStatus } from '../../../entities/payment/PaymentStatus';

describe('ConfirmPayment', () => {
    it('marks order as PAID when payment is approved', async () => {
        const order = Order.create([
            new OrderItem({ productId: 'p1', quantity: 1, unitPrice: 100 }),
        ]);

        const repo = new InMemoryOrderRepository();
        repo.saveWithId('order-1', order);

        const publisher = new InMemoryEventPublisher();
        const useCase = new ConfirmPayment(repo, publisher);

        const payment = new PaymentResult({
            status: PaymentStatus.APPROVED,
            providerReference: 'ref-123',
            receivedAt: new Date(),
        });

        await useCase.execute('order-1', payment);

        expect(order.getStatus()).toBe(OrderStatus.Paid);
        expect(publisher.events.length).toBe(1);
    });
});

it('marks order as FAILED when payment is rejected', async () => {
    const order = Order.create([
        new OrderItem({ productId: 'p1', quantity: 1, unitPrice: 100 }),
    ]);

    const repo = new InMemoryOrderRepository();
    repo.saveWithId('order-2', order);

    const publisher = new InMemoryEventPublisher();
    const useCase = new ConfirmPayment(repo, publisher);

    const payment = new PaymentResult({
        status: PaymentStatus.REJECTED,
        providerReference: 'ref-456',
        receivedAt: new Date(),
    });

    await useCase.execute('order-2', payment);

    expect(order.getStatus()).toBe(OrderStatus.Failed);
    expect(publisher.events.length).toBe(1);
});
