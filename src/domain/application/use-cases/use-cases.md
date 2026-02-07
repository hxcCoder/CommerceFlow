# Use Cases – CommerceFlow

This document defines the application-level commands that drive the system.
Each use case represents a single business intention.

---

## 1. CreateOrder

### Intent
Create a new order from a list of products.

### Input
- items (productId, quantity)

### Responsibilities
- Validate request structure
- Verify products availability
- Calculate total amount
- Create Order entity
- Emit OrderCreated

### Output
- orderId
- order status

---

## 2. RequestOrderPayment

### Intent
Move an order into payment pending state.

### Trigger
- OrderCreated event OR explicit command

### Responsibilities
- Validate order is payable
- Transition order to PaymentPending
- Emit OrderPaymentRequested

---

## 3. ConfirmPayment

### Intent
Confirm the result of an external payment.

### Input
- orderId
- PaymentResult

### Responsibilities
- Validate payment authenticity (outside domain)
- Apply payment result to order
- Emit OrderPaid or OrderFailed

---

## 4. FulfillOrder

### Intent
Complete the delivery of a paid order.

### Input
- orderId
- fulfillment data

### Responsibilities
- Validate order is paid
- Trigger fulfillment
- Mark order as fulfilled
- Emit OrderFulfilled

---

## Failure Handling

- Any domain error aborts the use case
- Failed orders cannot be mutated
- Infrastructure errors do not leak into domain
