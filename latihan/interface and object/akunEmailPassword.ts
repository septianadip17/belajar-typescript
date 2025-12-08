// type User = {
//   email: string;
//   password: string;
// };

// Lu bikin 3 akun, terus bikin function login(email, password). Kalau ada & match passwordnya, maka return email nya saja. Kalau ga ada, return null


interface User {
  email: string;
  password: string;
}

const Users: User[] = [
  {
    email: "email@mail.com",
    password: "123456"
  },
  {
    email: "email1@mail.com",
    password: "123123"
  },
  {
    email: "email2@mail.com",
    password: "654321"
  }
]

function loginUser(email: string, password: string) : string | null {
  for (const user of Users){
    if (user.email === email && user.password === password){
      return email
    }
  }
  return null
} 

const emailOrang: string = "email1@mail.com"
const passwordOrang: string = "123123w"
const hasil: string | null = loginUser(emailOrang, passwordOrang)

console.log(hasil)