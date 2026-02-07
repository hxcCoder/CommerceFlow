# Domain Errors – CommerceFlow

## Order Errors

### OrderAlreadyPaid
Thrown when attempting to mark an order as paid more than once.

### OrderNotPayable
Thrown when attempting to initiate payment from an invalid state.

### OrderNotFulfillable
Thrown when attempting to fulfill an order without approved payment.

### OrderAlreadyFinalized
Thrown when attempting to mutate a Failed or Fulfilled order.

---

## Product Errors

### ProductUnavailable
Thrown when attempting to create an order with an unavailable product.

---

## Payment Errors

### InvalidPaymentResult
Thrown when receiving an inconsistent or unverifiable payment result.
