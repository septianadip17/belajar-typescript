function prosesData(value?: number): number | string {
  if (value === undefined) {
    return "No Data";
  }

  return value * value;
}

const dataMuncul = prosesData(5)
const dataTidakAda = prosesData()
const dataTidakAda2 = prosesData(undefined)


console.log(dataMuncul)
console.log(dataTidakAda)
console.log(dataTidakAda2)

// fungsi tanda tanya di dalam parameter itu agar bisa manggil function walau tidak ada isi
