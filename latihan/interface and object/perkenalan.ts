interface Murid {
  nama: string;
  umur: number;
}

function kenalanMurid(o: Murid): string {
  return `Nama saya ${o.nama} dan umur saya ${o.umur} tahun`
}

const orang: Murid = {
  nama: "Ipal Jago PB",
  umur: 17
}
const muridKenalan: string = kenalanMurid(orang)
console.log(muridKenalan)