// import { User } from "./User";

interface User {
  id: number;
  name: string;
  balance: number;
}

// function get user id
function getUserById(id: number): User | null {
  for (const user of Users) {
    if (user.id === id) {
      return user
    }
  }
  return null
}

// function check balance user
function checkBalance(userId: number): number | string {
  for (const user of Users) {
    if (user.id === userId) {
      return user.balance
    }
  }
  return "User not found"
}

// function top up balance
function topUpBalance(userId: number, amount: number): string {
  for (const user of Users) {
    if (user.id === userId && amount <= 0) {
      return "Invalid amount"
    } else if (user.id === userId && amount >= 0) {
      const saldoUser = user.balance + amount
      return `Top up success ${saldoUser} + ${amount} = ${saldoUser}`
    } else if (userId !== user.id) {
      return "User not found"
    }
  }
  return ""
}

// data user
let Users: User[] = [
  { id: 1, name: "Andi", balance: 100000 },
  { id: 2, name: "Budi", balance: 50000 },
  { id: 3, name: "Citra", balance: 200000 },
];

// check user id
const checkUserId = getUserById(1)
console.log(checkUserId)

// check user balance
const checkUserBalance = checkBalance(1)
console.log(checkUserBalance)

// top up balance
const topUpBalanceUser = topUpBalance(4, 2000)
console.log(topUpBalanceUser)

// 
