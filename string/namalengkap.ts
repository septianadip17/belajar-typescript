// Buat function yang menerima nama depan dan nama belakang, lalu me-return nama lengkap.

function formNama(namaDepan: string, namaBelakang: string) : string | null{
  const namaLengkap = namaDepan + " " + namaBelakang
  if (!namaDepan || !namaBelakang){
    return null
  }
  return namaLengkap;
}
const formNamaLengkap = formNama("", "isi")
console.log(formNamaLengkap)