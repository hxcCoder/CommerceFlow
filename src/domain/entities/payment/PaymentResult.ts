import { PaymentStatus } from './PaymentStatus';

export class PaymentResult {
    constructor(
        public readonly status: PaymentStatus,
        public readonly providerReference: string,
        public readonly receivedAt: Date
    ) {}
}
