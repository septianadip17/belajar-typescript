# Tugas 1

Get product by id

```ts
getProductById(id: number): Product | undefined
```

Rules:
- Cari produk berdasarkan `id` yang diberikan.
- Return undefined jika produk tidak ditemukan.

# Tugas 2

Add to cart

```ts
addToCart(productId: number, quantity: number): string
```

Rules:
- Jika produk tidak ada → "Product not found"
- Jika quantity ≤ 0 → "Invalid quantity"
- Jika stock tidak cukup → "Out of stock"
- Jika produk sudah ada di cart → tambahkan quantity
- Jika sukses → "Added to cart"

# Tugas 3

Remove from cart

```ts
removeFromCart(productId: number): string
```

Rules:
- Jika produk tidak ada di cart → "Product not in cart"
- Jika ada → hapus dari cart
- Return "Removed from cart"

# Tugas 4

Get cart total

```ts
getCartTotal(): number
```

Rules:
- Hitung total harga semua item di cart
- Total = price × quantity

# Tugas 5

Checkout

```ts
checkout(): string
```

Rules:
- Jika cart kosong → "Cart is empty"
- Kurangi stock masing-masing produk
- Kosongkan cart setelah checkout
- Return "Checkout success"

# Tugas Final

Product Summary

```ts
getProductSummary(): string[]
```

Contoh output:

```
[
  "Keyboard - Rp250000 (Stock: 10)",
  "Mouse - Rp150000 (Stock: 15)",
  "Monitor - Rp2000000 (Stock: 5)"
]
```