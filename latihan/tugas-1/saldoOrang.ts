// import { User } from "./User";

interface User {
  id: number;
  name: string;
  balance: number;
}

function getUserById(id: number): User | null {
  for (const user of Users) {
    if (user.id === id) {
      return user
    }
  }
  return null
}

let Users: User[] = [
  { id: 1, name: "Andi", balance: 100000 },
  { id: 2, name: "Budi", balance: 50000 },
  { id: 3, name: "Citra", balance: 200000 },
];
const idUser = getUserById(1)
console.log(idUser)