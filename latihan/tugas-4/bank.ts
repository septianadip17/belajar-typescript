type Account = {
  id: number;
  owner: string;
  balance: number;
  holdBalance: number;
}

let accounts: Account[] = [
  { id: 1, owner: "Alice", balance: 1000000, holdBalance: 0 },
  { id: 2, owner: "Bob", balance: 500000, holdBalance: 0 },
]

enum TransactionStatus {
  HOLD = "HOLD",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

type Transaction = {
  id: number; fromId: number;
  told: number; amount: number; fee: number;
  status: TransactionStatus;
}
  
let transactions: Transaction[] = [];
let transactionCounter = 1;
