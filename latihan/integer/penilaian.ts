// Buat function yang:

// Menerima score: number

// Return:

// "A" jika score ≥ 90

// "B" jika score ≥ 80

// "C" jika score ≥ 70

// "D" jika di bawah 70

function penilaianSiswa(score: number) :string {
  if (score >= 90) {
    return "A"
  } else if (score >= 80) {
    return "B"
  } else if (score >= 70) {
    return "C"
  } else {
    return "D"
  }
}

const nilaiAgung = penilaianSiswa(80)
console.log(nilaiAgung)