Data awal

⁠ type User = {
  id: number;
  name: string;
  balance: number;
};

let users: User[] = [
  { id: 1, name: "Andi", balance: 100000 },
  { id: 2, name: "Budi", balance: 50000 },
  { id: 3, name: "Citra", balance: 200000 },
]; ⁠


Tugas 1:

⁠ getUserById(id: number): User | null ⁠

Rules:
•⁠  ⁠Cari user berdasarkan id
•⁠  ⁠Return user jika ketemu
•⁠  ⁠Return null jika tidak ada


Tugas 2:

⁠ checkBalance(userId: number): number | string ⁠

Rules:
•⁠  ⁠Jika user ada → return balance
•⁠  ⁠Jika user tidak ada → return "User not found"
Tugas 3:

⁠ topUp(userId: number, amount: number): string ⁠

Rules:
•⁠  ⁠Jika user tidak ada → "User not found"
•⁠  ⁠Jika amount ≤ 0 → "Invalid amount"
•⁠  ⁠Jika sukses → "Top up success"
•⁠  ⁠Saldo user harus bertambah

Tugas 4:

⁠ transfer(fromId: number, toId: number, amount: number): string ⁠

Rules:
•⁠  ⁠Jika salah satu user tidak ada → "User not found"
•⁠  ⁠Jika saldo pengirim kurang → "Insufficient balance"
•⁠  ⁠Jika amount ≤ 0 → "Invalid amount"
•⁠  ⁠Jika sukses:
•⁠  ⁠-> saldo pengirim berkurang
•⁠  ⁠-> saldo penerima bertambah
•⁠  ⁠-> return "Transfer success"
[09/12/25, 15.29.26] Ipal Bawah: Tugas Final:

⁠ getUserSummary(): string[] ⁠

Ekspektasi output:

⁠ [
  "Andi - Rp100000",
  "Budi - Rp50000",
  "Citra - Rp200000"
] ⁠