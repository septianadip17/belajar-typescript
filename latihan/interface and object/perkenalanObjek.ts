interface Murid {
  nama: string;
  umur: number;
}

function kenalanMurid2(nama: string, umur: number): Murid {
  const dataMurid: Murid = {
    nama: nama,
    umur: umur
  }
  return dataMurid
}

const panggilMurid: Murid = kenalanMurid2("Ipal Jago PB", 17)
console.log(panggilMurid)