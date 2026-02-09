import { CreateOrder } from '../CreateOrder';
import { InMemoryOrderRepository } from './fakes/InMemoryOrderRepository';

describe('CreateOrder', () => {
    it('creates an order with items', async () => {
        const repository = new InMemoryOrderRepository();
        const useCase = new CreateOrder(repository);

        await useCase.execute([
    {
            productId: 'p1',
            quantity: 2,
            unitPrice: 100,
    },
]);


        expect(repository.count()).toBe(1);

        const [order] = repository.getAll();
        expect(order.getTotalAmount()).toBe(200);
    });
});
