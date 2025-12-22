type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

let products: Product[] = [
  { id: 11, name: "Laptop", price: 10000000, stock: 5 },
  { id: 12, name: "Headphone", price: 1000000, stock: 10 },
  { id: 13, name: "Mouse", price: 300000, stock: 20 },
];

type OrderItem = {
  productId: number;
  quantity: number;
};

type Order = {
  id: number;
  items: OrderItem[];
  status: OrderStatus;
};

enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELED = "CANCELED",
}

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
    if (item.quantity === 0) {
      return "Input stock, please"
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
  let match: boolean = false

  for (const order of orders) {
    if (orderId === order.id) {
      match = true
    }
  }

  if (match === false) {
    return "data not found"
  }
  let total = 0
  for (const order of orders) {
    if (order.id === orderId) {
      for (const item of order.items) {
        const product = getProductById(item.productId)
        if (product !== undefined) {
          total += product.price * item.quantity
        }
      }
    }
  }
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

// function order summary
function getOrderSummary(): string[] {
  return orders.map((order) => `Order #${order.id} - ${order.status}`);
}

// function get revenue
function getRevenue(): number {
  let revenue: number = 0
  for (const order of orders) {
    if (order.status === "PAID") {
      for (const item of order.items) {
        const product = getProductById(item.productId)
        if (product !== undefined) {
          revenue += product.price * item.quantity
        }
      }
    }
  }
  return revenue
}


// // get product by id
// const getProduct = getProductById(1);
// console.log(getProduct);

// create order
const createAnOrder = createOrder([
  { productId: 12, quantity: 2 }
]);
console.log(createAnOrder);
// const createOrders = createOrder([
//   { productId: 11, quantity: 2 },
//   { productId: 12, quantity: 2 }
// ]);
// console.log(createOrders);

// order total
const orderTotal = calculateOrderTotal(3);
console.log(orderTotal);

// pay order
const letsPay = payOrder(1)
console.log(letsPay);

// // cancel order
// const cancel = cancelOrder(1)
// console.log(cancel);

// order summary
const summary = getOrderSummary();
console.log(summary);

// revenue
const revenue = getRevenue()
console.log(`uang yg didapatkan Rp. ${revenue}`)