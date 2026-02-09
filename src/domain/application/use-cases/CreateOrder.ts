import { Order } from '../../entities/order/Order';
import { OrderItem } from '../../entities/order/OrderItem';
import { OrderRepository } from '../ports/OrderRepository';

type CreateOrderItemInput = {
    productId: string;
    quantity: number;
    unitPrice: number;
};

export class CreateOrder {
    constructor(private readonly orderRepository: OrderRepository) {}

async execute(items: CreateOrderItemInput[]): Promise<Order> {
    const orderItems = items.map(
        (item) =>
        new OrderItem({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
        })
    );

    const order = Order.create(orderItems);

    await this.orderRepository.save(order);

    return order;
}
}
