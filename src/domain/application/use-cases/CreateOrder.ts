import { ProductRepository } from '../ports/ProductRepository';
import { OrderRepository } from '../ports/OrderRepository';
import { EventPublisher } from '../ports/EventPublisher';

import { Order } from '../../entities/order/Order';
import { OrderItem } from '../../entities/order/OrderItem';
import { OrderCreated } from '../../events/OrderCreated';

export interface CreateOrderInput {
    items: {
        productId: string;
        quantity: number;
}[];
}

export class CreateOrder {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly orderRepository: OrderRepository,
        private readonly eventPublisher: EventPublisher
) {}

async execute(input: CreateOrderInput): Promise<{ orderId: string }> {
    const productIds = input.items.map(i => i.productId);

    const products = await this.productRepository.findByIds(productIds);

    if (products.length !== productIds.length) {
        throw new Error('One or more products not found');
    }

    const orderItems = input.items.map(item => {
        const product = products.find(p => p.id === item.productId)!;

    if (!product.isAvailable()) {
        throw new Error(`Product ${product.id} is unavailable`);
    }

        return new OrderItem(
        
                product.id,
            item.quantity,
            product.price
        );
    });

    const order = new Order(
        crypto.randomUUID(),
        orderItems
    );

    await this.orderRepository.save(order);

    await this.eventPublisher.publish(
        new OrderCreated(order.id, order.getTotalAmount())
    );

    return { orderId: order.id };
}
}
