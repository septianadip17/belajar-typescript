type Car = {
  plateNumber: string; // Plat Nomor (Unik)
  entryTime: number;   // Jam Masuk (Anggap pakai angka 1 - 24)
}

// Parkiran cuma muat 5 mobil
const MAX_CAPACITY = 5;

// Ini tempat nyimpen mobil yang sedang parkir
let activeParking: Car[] = [];

function parkCar(plateNumber: string, entryTime: number): string {

  // 1. CEK PARKIRAN PENUH
  // (Jika jumlah activeParking lebih atau sama dengan MAX_CAPACITY, return "Parking Full")
  if ( ... ) {
    return "Parking Full";
  }

  // 2. CEK PLAT NOMOR DUPLIKAT
  // (Looping for...of ke activeParking. Jika ketemu plat sama, return "Car already inside")
  for ( ... ) {
    // ... ISI DISINI ...
  }

  // 3. VALIDASI JAM MASUK (Optional tapi bagus)
  // (Jika entryTime kurang dari 0 atau lebih dari 24, return "Invalid time")
  if (entryTime < 0 || entryTime > 24) {
    return "Invalid time";
  }

  // 4. MASUKKAN MOBIL (Kalau semua aman)
  // Buat object baru, lalu push.
  const newCar: Car = {
    plateNumber: plateNumber,
    entryTime: entryTime
  };

  // ... PUSH KE ARRAY DISINI ...

  return "Success check-in";
}