import { OrderRepository } from '../../../ports/OrderRepository';
import { Order } from '../../../../entities/order/Order';

export class InMemoryOrderRepository implements OrderRepository {
    private orders = new Map<string, Order>();

    async findById(id: string): Promise<Order | null> {
        return this.orders.get(id) ?? null;
    }

    async save(order: Order): Promise<void> {
        // En un fake simple no hacemos nada aquí
        // El test controla cuándo se inserta
    }

    // ===== Helpers SOLO para tests =====

    saveWithId(id: string, order: Order): void {
        this.orders.set(id, order);
    }

    count(): number {
        return this.orders.size;
    }

    getAll(): Order[] {
        return Array.from(this.orders.values());
    }
}
