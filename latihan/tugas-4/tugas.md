# MINI CASE PROJECT #5 (WITH TRANSFER FEE)

## Simple Bank System - Function Only (TypeScript)

### Goal Melatih:

- aritmatika (balance + fee)
- parameter & return type
- if condition
- transaction Flow (HOLD - COMPLETED /CANCELED)

### Fee Rule (NEW)

- Transfer fee = 2% dari amount
- Minimum fee = Rp2.000

```ts
fee = Math.max(amount * 0.02, 2000);
```

## TASKS

### 1. Get Account by ID

```ts
getAccountById(accountId: number): Account | undefined
```

### 2. Check Balance

```ts
checkBalance(accountId: number): number | string
```

Rules:

- Account not found - `"Account not found"`
- Return available balance
  `balance - holdBalance`

### 3. Hold Money (Include Fee)

```ts
holdMoney (
  fromId: number,
  toId: number,
  amount: number
): string | Transaction
```

Rules:

- Account not found → `"Account not found"`
- fromId === toId → `"Cannot transfer to same account"`
- amount <= 0 → `"Invalid amount"`
- Calculate fee
- Total hold = `amount + fee`
- If available balance < total hold → `"Insufficient balance"`
- If success:
  - sender `holdBalance += total hold`
  - create transaction with:
    - `amount`
    - `fee`
    - status `HOLD`
  - return transaction

### 4. Complete Transfer
```ts
 completeTransfer(transactionId: number): string
 ```

Rules:
- Transaction not found → ``` "Transaction not found" ```
- Status not ``` HOLD ``` → ``` "Transaction cannot be completed" ```
- If success:
  - sender ``` balance -= (amount + fee) ```
  - sender ``` holdBalance -= (amount + fee) ```
  - receiver ``` balance += amount ```
  - status → ``` COMPLETED ```
  - return ``` "Transfer completed" ```
#### 📌 Fee is NOT added to receiver

### 5. Cancel Transfer
```ts
cancelTransfer(transactionId: number): string
```
Rules:
- Transaction not found → ``` "Transaction not found" ```
- Status not ``` HOLD ``` → ``` "Transaction cannot be canceled" ```
- If success:
  - sender ``` holdBalance -= (amount + fee) ```
  - status → CANCELED
  - return ``` "Transfer canceled" ```

### 6. Transaction Summary
```ts
getTransactionSummary(): string[]
```

Example:

``` ts
[
"TX#1 - HOLD - Rp100000 (Fee: Rp2000)",
"TX#2 - COMPLETED - Rp50000 (Fee: Rp2000)"
]
```


## Mentor Discussion Question
Tanya mentee:
``` 
Kenapa fee ikut di-hold, bukan langsung dipotong? 
```
Jawaban ideal:
- biar aman kalau transfer dibatalkan
- balance ga bocor
- konsisten sama flow transaction