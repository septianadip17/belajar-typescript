function calculateResult(a: number, b: number, operation: string): number | string {
  if (operation === "+") {
    return a + b
  } else if (operation === "*") {
    return a * b
  } else if (operation === "-") {
    return a - b
  } else if (operation === "/") {
    if (b === 0) {
      "can not divide by zero"
    }
    return a / b
  }
  return "invalid operation"
}

// penjumlahan
const penjumlahan = calculateResult(1, 2, "+")
console.log(`penjumlahan ${penjumlahan}`)

// perkalian
const perkalian = calculateResult(1, 2, "*")
console.log(`perkalian ${perkalian}`)

// pengurangan
const pengurangan = calculateResult(2, 1, "-")
console.log(`pengurangan ${pengurangan}`)

// pembagian
const pembagianPertama = calculateResult(4, 2, "/")
const pembagianKedua = calculateResult(2, 0, "/")
console.log(`pembagian pertama ${pembagianPertama}`)
console.log(`pembagian kedua ${pembagianKedua}`)

// invalid operation
const ngasal = calculateResult(1, 2, ";")
console.log(`ngasal ${ngasal}`)