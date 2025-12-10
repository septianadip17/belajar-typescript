type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

var products: Product[] = [
  { id: 1, name: "Keyboard", price: 250000, stock: 10 },
  { id: 2, name: "Mouse", price: 150000, stock: 15 },
  { id: 3, name: "Monitor", price: 2000000, stock: 5 },
];

type CartItem = {
  productId: number;
  quantity: number;
};

var cart: CartItem[] = [];

