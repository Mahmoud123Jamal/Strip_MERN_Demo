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

## Stripe CLI Setup on Windows

Stripe CLI Setup on WindowsThis section explains how to install and configure Stripe CLI, add it to your system PATH, test it, and handle webhook listening and re-authentication.1️⃣ Download and Extract Stripe CLIDownload :
https://github.com/stripe/stripe-cli/releases

---

---

### 2️⃣ Add Stripe CLI to System PATH

Open **PowerShell as Administrator** and follow these steps **line by line**.

#### Step 2.1: Get the current system PATH

```powershell
$path = [System.Environment]::GetEnvironmentVariable('Path', 'Machine')
$path
$newPath = "C:\Users\YourUser\Downloads\stripe_1.18.0_windows_x86_64"
[System.Environment]::SetEnvironmentVariable('Path', $path + ';' + $newPath, 'Machine')
stripe --version
stripe login
stripe listen --forward-to http://localhost:3001/api/webhook
output example->> Ready! Your webhook signing secret is whsec_xxxxx
> Forwarding events to http://localhost:3000/webhook

```

---

## Important Notes

Run PowerShell as Administrator when modifying system PATH.

Add the Stripe CLI folder only if it’s not already included to avoid duplicates.

Keep a reminder to re-authenticate every 80–90 days.
Add path where stripe.exe is stored , in environment variables in windows.
