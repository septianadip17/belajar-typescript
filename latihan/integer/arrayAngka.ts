// Function menerima array angka, lalu return total semua isinya.

function isiArray(arr: number[]):number | null{
  let total: number = 0
  if (arr.length == 0){
    return null
  }
  for (const num of arr){
    total += num
  }
  return total
}

const angkaSaya: number[] = []
const hasilAngka = isiArray(angkaSaya)

console.log(hasilAngka)