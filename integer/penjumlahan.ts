// Buat function yang menerima 2 parameter angka dan me-return hasil penjumlahannya.

function  penjumlahanAngka(a: number, b: number) :number | null {
  const c = a + b
  if (c < 100){
    return null
  }
  return c;
}
const d = penjumlahanAngka(100, 9)
console.log(d)
