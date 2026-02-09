import { EventPublisher } from '../../../ports/EventPublisher';

export class InMemoryEventPublisher implements EventPublisher {
public events: unknown[] = [];

async publish(event: unknown): Promise<void> {
    this.events.push(event);
}
}
