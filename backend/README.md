# Stripe Checkout with Stock Locking (Node.js + Express + MongoDB)

This project demonstrates a **production-ready Stripe payment flow** using:

- Stripe Checkout
- PaymentIntents
- Secure Webhooks
- Stock locking to prevent overselling
- MongoDB + Mongoose
- Express.js + TypeScript

---

## Features

- Create products with limited stock
- Lock product stock during checkout (temporary reservation)
- Redirect users to Stripe Checkout
- Handle payment success & failure using Stripe Webhooks
- Automatically release locked stock on failure or timeout
- Prevent duplicate orders (idempotency)

---

## Core Concepts

### 1️⃣ Stripe Checkout

Stripe-hosted payment page that handles:

- UI
- Validation
- PCI compliance

### 2️⃣ Payment Intent

Represents a **single payment attempt** in Stripe.

- Created automatically when Checkout Session is created
- Emits events like:
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`

### 3️⃣ Webhooks

Stripe sends **server-to-server events** to notify your backend:

- Payment succeeded
- Payment failed
- Retry-safe (can be sent multiple times)

### 4️⃣ Stock Locking

Prevents overselling by reserving stock **before payment completes**.

---

## 📦 Product Stock Logic

Each product has:

| Field           | Description                |
| --------------- | -------------------------- |
| `stock`         | Total available units      |
| `lockedStock`   | Temporarily reserved units |
| `lockExpiresAt` | When the lock expires      |

**Available stock formula:**

```ts
availableStock = stock - lockedStock;
```
