interface Student {
  name: string
  saldo: number
}

let Students: Student[] = [
  {
    name: "Rayhan",
    saldo: 0,
  },
  {
    name: "Rival",
    saldo: 0,
  },
]

function loopOne() {
  for (let i = 0; i < Students.length; i++) {
    let st: Student = Students[i]
    console.log(st) // saldo sebelum
    st.saldo += 1000
  }
  console.log(Students)
}

loopOne()

// function loopTwo() {
//   Students.forEach((st: Student) => {
    // console.log(st.name)
//   })
// }
// 
// loopTwo()
// 
// function loopTwoHalf() {
    // var print = (st: Student) => {
        // console.log(st.name)
    // }
    // Students.forEach(print)
// }
// 
// loopTwoHalf()
// 
// function loopThree() {
//   Students.forEach(printLoopThree)
// }
// 
// function printLoopThree(st: Student) {
//   console.log(st.name)
// }
// 
// loopThree()
// 
// function loopFour() {
//   for (const st of Students) {
    // console.log(st.name)
//   }
// }
// 
// loopFour()