export class OrderPaymentRequested {
  constructor(
    public readonly orderId: string,
    public readonly occurredAt: Date = new Date()
  ) {}
}
