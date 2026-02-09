import { OrderRepository } from '../ports/OrderRepository';
import { EventPublisher } from '../ports/EventPublisher';
import { OrderPaymentRequested } from '../../events/OrderPaymentRequested';

export class RequestOrderPayment {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly eventPublisher: EventPublisher
    ) {}

    async execute(orderId: string): Promise<void> {
        const order = await this.orderRepository.findById(orderId);

        if (!order) {
            throw new Error('Order.notFound');
        }

        order.requestPayment();

        await this.orderRepository.save(order);

        await this.eventPublisher.publish(
            new OrderPaymentRequested(orderId)
        );
    }
}
