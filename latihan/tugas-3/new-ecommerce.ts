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


// function get product by id
function getProductById(productId: number): Product | undefined {
  return products.find((product) => product.id === productId);
}

// function create order
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

// function calculate order total
function calculateOrderTotal(orderId: number): number | string {
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return "Order not found";
  }
  const total = order.items.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    const price = product ? product.price : 0;
    return acc + (price * item.quantity);
  }, 0);
  return total;
}

// function pay order
function payOrder(orderId: number): string {
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return "Order not found";
  }
  if (order.status !== OrderStatus.PENDING) {
    return "Order cannot be paid";
  }
  for (const item of order.items) {
    const product = products.find((p) => p.id === item.productId);

    if (product) {
      product.stock -= item.quantity;
    }
  }
  order.status = OrderStatus.PAID;
  return "Payment success";
}

// function cancel order
function cancelOrder(orderId: number): string {
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return "Order not found";
  }

  if (order.status === OrderStatus.PAID) {
    return "Paid order cannot be canceled";
  }

  order.status = OrderStatus.CANCELED;

  return "Order canceled";
}







// get product by id
const getProduct = getProductById(1);
console.log(getProduct);

// create order
const createAnOrder = createOrder([
  { productId: 1, quantity: 1 }
]);
console.log(createAnOrder);

// order total
const orderTotal = calculateOrderTotal(1);
console.log(orderTotal);

// // pay order
// const letsPay = payOrder(1)
// console.log(letsPay);

// cancel order
const cancel = cancelOrder(1)
console.log(cancel);
