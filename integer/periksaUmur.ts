// Function menerima umur, lalu return true jika umur ≥ 18, selain itu false.

function cekUmur(umur: number):boolean {
  return umur >= 18
}

let umurSiswa = 17;
const sah = cekUmur(umurSiswa)
console.log(sah)