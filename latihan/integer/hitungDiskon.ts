// Function menerima:
// price: number
// discount: number (dalam persen)
// Return harga setelah diskon.

function hitungDiskon(hargaAwal: number, diskon: number): number {
  const hargaDiskon = hargaAwal * (diskon / 100)
  const hargaAkhir = hargaAwal - hargaDiskon
  return hargaAkhir
}

const hasil: number = hitungDiskon(25000, 10)

console.log(hasil)