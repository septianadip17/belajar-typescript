type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

let products: Product[] = [
  { id: 1, name: "Laptop", price: 10000000, stock: 5 },
  { id: 2, name: "Headphone", price: 1000000, stock: 10 },
  { id: 3, name: "Mouse", price: 300000, stock: 20 },
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


// get product by id
function getProductById(productId: number): Product | undefined {
  return products.find((product) => product.id === productId);
}

// create order
function createOrder(items: OrderItem[]): string | Order {
  if (items.length === 0) {
    return "Order items required";
  }

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return "Product not found";
    }
    if (product.stock < item.quantity) {
      return "Insufficient stock";
    }
  }

  const newOrder: Order = {
    id: orderCounter,
    items: items,
    status: OrderStatus.PENDING,
  };

  orders.push(newOrder);
  orderCounter++;
  return newOrder;
}


const resultSuccess = createOrder([
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 2 }
]);
console.log("Success:", resultSuccess);

// B. Gagal: Items kosong
console.log("Empty:", createOrder([]));
// Output: "Order items required"

// C. Gagal: Product ID ngawur (misal ID 99)
console.log("Not Found:", createOrder([{ productId: 99, quantity: 1 }]));
// Output: "Product not found"

// D. Gagal: Stok kurang (Beli 21 Mouse, padahal stok cuma 20)
console.log("Stock:", createOrder([{ productId: 3, quantity: 21 }]));
// Output: "Insufficient stock"









// const found = getProductById(1);
// console.log("Ditemukan:", found);

// const notFound = getProductById(99);
// console.log("Tidak Ditemukan:", notFound);

