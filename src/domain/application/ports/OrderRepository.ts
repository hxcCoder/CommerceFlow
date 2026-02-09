import { Order } from '../../entities/order/Order';

export interface OrderRepository {
    findById(id: string): Promise<Order | null>;
    save(order: Order): Promise<void>;
}
