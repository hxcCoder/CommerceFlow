# Order Lifecycle – CommerceFlow

## Purpose
Defines the lifecycle of an Order as a deterministic business process.
This lifecycle is executed by the process engine and driven by domain events.

---

## Process Name
OrderLifecycle

---

## Initial Event
OrderCreated

---

## Steps

### Step 1 — Request Payment
Triggered by: OrderCreated

- The order enters PaymentPending state
- Emits OrderPaymentRequested

This step does NOT initiate payment.
It only declares that payment is required.

---

### Step 2 — Await Payment Result
Triggered by: external payment confirmation

Possible outcomes:
- Approved → continue
- Rejected → fail process

Emits:
- OrderPaid OR
- OrderFailed

---

### Step 3 — Request Fulfillment
Triggered by: OrderPaid

- Determines fulfillment type (digital / physical)
- Emits OrderFulfillmentRequested

---

### Step 4 — Fulfill Order
Triggered by: fulfillment completion

- Marks order as Fulfilled
- Emits OrderFulfilled

This step is terminal.

---

## Failure Handling

An order may fail at any point before fulfillment.

Failure causes:
- Payment rejection
- Inconsistent state
- Irrecoverable domain error

On failure:
- Order enters Failed state
- Emits OrderFailed
- Process is terminated

---

## Invariants

- An order cannot leave Failed or Fulfilled states
- Only one active execution per order
- Events drive progression, never HTTP

---

## Notes

- This lifecycle is deterministic
- External systems react to events
- The engine owns execution state
