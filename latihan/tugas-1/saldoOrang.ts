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

// function top up
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
  if (amount <= 0) {
    return "Invalid amount"
  }
  // 
  for (var user1 = 0; user1 < Users.length; user1++) {
    var dataPengirim = Users[user1]
    for (var user2 = 0; user2 < Users.length; user2++) {
      var dataPenerima = Users[user2]
      if (dataPengirim.balance < amount) {
        return "Insufficient balance"
      }
      if (dataPengirim.id === fromId && dataPenerima.id === toId) {
        dataPengirim.balance -= amount
        dataPenerima.balance += amount
        return "Transfer success"
      }
    }
  }
  return "user not found"
}

// get summary
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

// // top up balance
// const topUpUser = topUp(1, 2000)
// console.log(topUpUser)

// transfer 
const transferUser = transfer(1, 2, 10000)
console.log(transferUser)

// get user summary
const userSummary = getUserSummary()
console.log(userSummary)