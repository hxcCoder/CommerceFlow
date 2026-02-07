## *Product*
- id
- name
- price
- type (DIGITAL | PHYSICAL)
- availability (AVAILABLE | UNAVAILABLE)

## *order*

*Conceptual order*
- id
- items: OrderItem[]
- totalAmount
- status
- createdAt

*Valid States*
- Created
- PaymentPending
- Paid
- Fulfilled
- Failed

*Critical Rules (Non-Negotiable)*

1- An order is created in the Create stage.

2- It only goes to PaymentPending once.

3- It cannot be marked as Paid twice.

4- It cannot be fulfilled without payment.

5- A failed order is considered final.


## OrderItem (Value Object)

*OrderItem*
- productId
- quantity
- unitPrice

*Rules:*

- quantity > 0

- unitPrice is frozen when the order is created

## PaymentResult

The domain does not process payments, it only reacts.

*PaymentResult*

- status (APPROVED | REJECTED | PENDING)
- providerReference
- receivedAt

