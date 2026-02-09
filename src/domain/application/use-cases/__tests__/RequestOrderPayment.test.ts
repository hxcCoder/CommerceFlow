import { RequestOrderPayment } from '../RequestOrderPayment';
import { InMemoryOrderRepository } from './fakes/InMemoryOrderRepository';
import { InMemoryEventPublisher } from './fakes/InMemoryEventPublisher';
import { Order } from '../../../entities/order/Order';
import { OrderItem } from '../../../entities/order/OrderItem';
import { OrderStatus } from '../../../entities/order/OrderStatus';

describe('RequestOrderPayment', () => {
    it('moves order to PAYMENT_PENDING and emits event', async () => {
        const order = Order.create([
            new OrderItem({ productId: 'p1', quantity: 1, unitPrice: 100 }),
        ]);

        const repo = new InMemoryOrderRepository();
        repo.saveWithId('order-1', order);

        const publisher = new InMemoryEventPublisher();
        const useCase = new RequestOrderPayment(repo, publisher);

        await useCase.execute('order-1');

        expect(order.getStatus()).toBe(OrderStatus.PaymentPending);
        expect(publisher.events.length).toBe(1);
    });
});
