# Tugas 1

Get product by id

```ts
⁠ getProductById(productId: number): Product | undefined ⁠
```

Rules:
-  ⁠Return product if exists
-  Undefined if not found

# Tugas 2

Create order

```ts
⁠ createOrder(items: OrderItem[]): string | Order ⁠
```

Rules:
-  ⁠Jika items kosong → "Order items required"
-  ⁠Jika salah satu product tidak ada → "Product not found"
-  ⁠Jika stock tidak cukup → "Insufficient stock"
-  ⁠Jika sukses:
-  ⁠-> buat order baru dengan status PENDING
-  ⁠-> jangan kurangi stock dulu
-  ⁠-> return order object

# Tugas 3

Calculate order total

```ts
⁠ calculateOrderTotal(orderId: number): number | string ⁠
```

Rules:
- ⁠ ⁠Order tidak ditemukan → "Order not found"
- ⁠Total = sum(price × quantity)

# Tugas 4

Pay order

```ts
⁠ payOrder(orderId: number): string ⁠
```

Rules:
-  ⁠Order not found → "Order not found"
-  Status bukan PENDING → "Order cannot be paid"
-  Jika sukses:
-  -> kurangi stock product
-  -> ubah status ke PAID
-  -> return "Payment success"

# Tugas 5

### Cancel order

```ts
⁠ cancelOrder(orderId: number): string ⁠
```

Rules:
-  Order not found → "Order not found"
-  Jika status PAID → "Paid order cannot be canceled"
-  Jika sukses:
-  -> ubah status ke CANCELED
-  -> return "Order canceled"

# Final (Tugas 6)

Order summary
```ts
⁠ getOrderSummary(): string[] ⁠
```

Expected output:
```ts
⁠[
  "Order #1 - PENDING",
  "Order #2 - PAID"
] ⁠
```