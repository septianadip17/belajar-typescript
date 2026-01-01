type Car = {
  plateNumber: string;
  entryTime: number;
}

const MAX_CAPACITY = 5;

let activeParking: Car[] = [];
function parkCar(plateNumber: string, entryTime: number): string {

  if (activeParking.length >= MAX_CAPACITY) {
    return "Parking Full";
  }

  for (const car of activeParking) {
    if (car.plateNumber === plateNumber) {
      return "Car already inside";
    }
  }

  if (entryTime < 0 || entryTime > 24) {
    return "Invalid time";
  }

  const newCar: Car = {
    plateNumber: plateNumber,
    entryTime: entryTime
  };

  activeParking.push(newCar);

  return "Success check-in";
}