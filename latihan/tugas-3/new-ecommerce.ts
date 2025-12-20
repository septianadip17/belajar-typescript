type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

let products: Product[] = [
  { id: 1, name: "Laptop", price: 10_000_000, stock: 5 },
  { id: 2, name: "Headphone", price: 1_000_000, stock: 10 },
  { id: 3, name: "Mouse", price: 300_000, stock: 20 },
];

enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELED = "CANCELED",
}

type OrderItem = {
  productId: number;
  quantity: number;
};

type Order = {
  id: number;
  items: OrderItem[];
  status: OrderStatus;
};

let orders: Order[] = [];
let orderCounter = 1;