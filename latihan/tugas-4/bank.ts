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
  toId: number; amount: number; fee: number;
  status: TransactionStatus;
}

let transactions: Transaction[] = [];
let transactionCounter = 1;


// function get account by id
function getAccountById(accountId: number): Account | undefined {
  for (const account of accounts) {
    if (account.id === accountId) {
      return account;
    }
  }
  return undefined;
}

// function check balance
function checkBalance(accountId: number): number | string{
  return 1
}





// get account by id
const getAccount = getAccountById(2)
console.log(getAccount)