import { PaymentStatus } from './PaymentStatus';

export class PaymentResult {
    readonly status: PaymentStatus;
    readonly providerReference: string;
    readonly receivedAt: Date;

constructor(params: {
    status: PaymentStatus;
    providerReference: string;
    receivedAt?: Date;
}) {
    this.status = params.status;
    this.providerReference = params.providerReference;
    this.receivedAt = params.receivedAt ?? new Date();
}
}
