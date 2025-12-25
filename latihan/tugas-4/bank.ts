type Account = {
  id: number;
  owner: string;
  balance: number;
  holdBalance: number;
};

let accounts: Account[] = [
  { id: 1, owner: "Alice", balance: 1000000, holdBalance: 0 },
  { id: 2, owner: "Bob", balance: 500000, holdBalance: 0 },
];

enum TransactionStatus {
  HOLD = "HOLD",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

type Transaction = {
  id: number;
  fromId: number;
  toId: number;
  amount: number;
  fee: number;
  status: TransactionStatus;
};

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
function checkBalance(accountId: number): number | string {
  for (const account of accounts) {
    if (account.id === accountId) {
      const availableBalance = account.balance - account.holdBalance;
      return availableBalance;
    }
  }
  return "Account not found";
}

// function hold money
function holdMoney(fromId: number, toId: number, amount: number): string | Transaction {
  if (fromId === toId) {
    return "Cannot transfer to same account";
  }
  if (amount <= 0) {
    return "Invalid amount";
  }

  let sender: Account | undefined;
  let receiver: Account | undefined;

  for (const account of accounts) {
    if (account.id === fromId) {
      sender = account;
    }
    if (account.id === toId) {
      receiver = account;
    }
  }
  if (!sender || !receiver) {
    return "Account not found";
  }
  const percentageFee = amount * 0.02;
  const fee = Math.max(percentageFee, 2000);
  const totalHold = amount + fee;

  const availableBalance = sender.balance - sender.holdBalance;

  if (availableBalance < totalHold) {
    return "Insufficient balance";
  }
  sender.holdBalance += totalHold;

  const newTransaction: Transaction = {
    id: transactionCounter,
    fromId: fromId,
    toId: toId,
    amount: amount,
    fee: fee,
    status: TransactionStatus.HOLD,
  };

  transactions.push(newTransaction);
  transactionCounter++;

  return newTransaction;
}

// function complete transfer
function completeTransfer(transactionId: number): string {
  for (const trx of transactions) {
    if (trx.id === transactionId) {
      if (trx.status !== TransactionStatus.HOLD) {
        return "Transaction cannot be completed";
      }
      let senderFound: Account | undefined;
      let receiverFound: Account | undefined;

      for (const account of accounts) {
        if (account.id === trx.fromId) {
          senderFound = account;
        }
      }

      for (const account of accounts) {
        if (account.id === trx.toId) {
          receiverFound = account;
        }
      }

      if (!senderFound || !receiverFound) {
        return "Account not found";
      }

      const totalDeduction = trx.amount + trx.fee;

      senderFound.balance -= totalDeduction;
      senderFound.holdBalance -= totalDeduction;

      receiverFound.balance += trx.amount;

      trx.status = TransactionStatus.COMPLETED;

      return "Transfer completed";
    }
  }

  return "Transaction not found";
}

// function cancel transfer
function cancelTransfer(transactionId: number): string {
  for (const trx of transactions) {
    if (trx.id === transactionId) {
      if (trx.status !== TransactionStatus.HOLD) {
        return "Transaction cannot be canceled";
      }
      for (const sender of accounts) {
        if (sender.id === trx.fromId) {
          const totalRelease = trx.amount + trx.fee;
          sender.holdBalance -= totalRelease;
          trx.status = TransactionStatus.CANCELED;
          return "Transfer canceled";
        }
      }
      return "Sender account not found";
    }
  }

  return "Transaction not found";
}

// function transaction summary
function getTransactionSummary(): string[] {
  let summary: string[] = [];
  for (const trx of transactions) {
    const line = `TX#${trx.id} - ${trx.status} - Rp${trx.amount} (Fee: Rp${trx.fee})`;
    summary.push(line);
  }

  return summary;
}

// get account by account id
const getAccount = getAccountById(2);
console.log(getAccount);

// check balance by account id
const userBalance = checkBalance(1);
console.log(userBalance);

// hold money
const trx1 = holdMoney(1, 2, 100000);
console.log(trx1);

// // complete transfer
// const complete = completeTransfer(1)
// console.log(complete)

// cancel transfer
const cancel = cancelTransfer(1)
console.log(cancel)

// transaction summary
const reports = getTransactionSummary();
console.log(reports);
