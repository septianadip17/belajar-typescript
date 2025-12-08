// Buat function yang menerima nama depan dan nama belakang, lalu me-return nama lengkap.

function formNama(namaDepan: string, namaBelakang: string) : string | null{
  const namaLengkap = namaDepan + " " + namaBelakang
  return namaLengkap;
}
const formNamaLengkap = formNama("Ipal", "Jago PB")
console.log(formNamaLengkap)