import { OrderRepository } from '../ports/OrderRepository';
import { EventPublisher } from '../ports/EventPublisher';
import { PaymentResult } from '../../entities/payment/PaymentResult';
import { PaymentStatus } from '../../entities/payment/PaymentStatus';
import { OrderPaid } from '../../events/OrderPaid';
import { OrderPaymentFailed } from '../../events/OrderPaymentFailed';

export class ConfirmPayment {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly eventPublisher: EventPublisher
    ) {}

    async execute(orderId: string, payment: PaymentResult): Promise<void> {
        const order = await this.orderRepository.findById(orderId);

        if (!order) {
            throw new Error('Order.notFound');
        }

        if (payment.status === PaymentStatus.APPROVED) {
            order.confirmPayment();
            await this.orderRepository.save(order);
            await this.eventPublisher.publish(new OrderPaid(orderId));
            return;
        }

        if (payment.status === PaymentStatus.REJECTED) {
            order.fail();
            await this.orderRepository.save(order);
            await this.eventPublisher.publish(new OrderPaymentFailed(orderId));
            return;
        }

        // PENDING → no cambia estado
    }
}
