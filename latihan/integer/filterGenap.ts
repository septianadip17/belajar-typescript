// Buat function yang:

// Menerima numbers: number[]

// Me-return array baru yang isinya hanya angka genap

function filterGenap(arr: number[]): number[] {
  let arrayKosong: number[] = []
  for (const arrayIsi of arr) {
    if (arrayIsi % 2 === 0) {
      arrayKosong.push(arrayIsi)
    }
  }
  return arrayKosong;
}

const angkaRandom: number[] = [1,2,3,4,5,6]
const filterAngkaGenap: number[] = filterGenap(angkaRandom)

console.log(filterAngkaGenap)