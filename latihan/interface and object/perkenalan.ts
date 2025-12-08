interface Murid {
  nama: string;
  umur: number;
}

const orang: Murid = {
  nama: "Ipal Jago PB",
  umur: 17
}

function kenalanMurid(k: Murid): string {
  return `Nama saya ${k.nama} dan umur saya ${k.umur} tahun`
}

const muridKenalan: string = kenalanMurid(orang)
console.log(muridKenalan)