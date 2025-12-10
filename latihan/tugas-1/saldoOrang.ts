// import { User } from "./User";

interface User {
  id: number;
  name: string;
  balance: number;
}


// data user
var Users: User[] = [
  { id: 1, name: "Andi", balance: 100000 },
  { id: 2, name: "Budi", balance: 50000 },
  { id: 3, name: "Citra", balance: 200000 },
];



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


function topUp(userId: number, amount: number): string {
  if (amount <= 0) {
    return "Invalid amount"
  }
  for (let i = 0; i < Users.length; i++) {
    var dataUser = Users[i]
    if (dataUser.id === userId) {
      dataUser.balance += amount
      return "Top up success"
    }
  }
  return "User not found"
}

// function transfer
function transfer(fromId: number, toId: number, amount: number): string {
  for (const user1 of Users) {
    if (amount <= 0) {
      return "invalid amount"
    }
    for (const user2 of Users) {
      if (fromId === user1.id && toId === user2.id) {
        let saldoPengirim = user1.balance
        let saldoPenerima = user2.balance
        if (saldoPengirim < amount) {
          return "Insufficient balance"
        } else {
          let saldoDiTransfer = amount + saldoPenerima
          let saldoSisaPengirim = saldoPengirim - amount
          return `Saldo pengirim berkurang ${saldoSisaPengirim}
          Saldo penerima bertambah ${amount}
          Total Saldo Penerima ${saldoDiTransfer}`
        }
      }
    }
  }
  return "user not found"
}

function getUserSummary(): string[] {
  const dataUser: string[] = []
  for (const user of Users) {
    let userName = user.name
    let userBalance = user.balance
    let userRow = `${userName} - Rp.${userBalance}`
    dataUser.push(userRow)
  }
  return dataUser
}




// // check user id
// const checkUserId = getUserById(1)
// console.log(checkUserId)

// // check user balance
// const checkUserBalance = checkBalance(1)
// console.log(checkUserBalance)

// top up balance
const topUpUser = topUp(1, 2000)
console.log(topUpUser)

// // transfer 
// const transferUser = transfer(1, 2, 5000)
// console.log(transferUser)

// get user summary
const userSummary = getUserSummary()
console.log(userSummary)