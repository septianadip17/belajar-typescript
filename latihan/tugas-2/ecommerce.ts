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

// get product by id
function getProductById(id: number): Product | undefined {
  // for (const product of products) {
  //   if (product.id === id) {
  //     return product
  //   }
  // }
  // return undefined
  return products.find((product) => product.id === id);
}

// add to cart
function addToCart(productId: number, quantity: number): string {
  if (quantity <= 0) {
    return "Invalid quantity";
  }
  const product = getProductById(productId);
  if (!product) {
    return "Product not found";
  }
  if (quantity > product.stock) {
    return "Out of stock";
  }
  const existingItemInCart = cart.find((item) => item.productId === productId);
  if (existingItemInCart) {
    existingItemInCart.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
    });
  }
  return "Added to cart";
}

// remove from cart
function removeFromCart(productId: number): string {
  const productExists = cart.find((item) => item.productId === productId)
  if (!productExists) {
    return "Product not in cart"
  }
  cart = cart.filter((item) => item.quantity - 1);
  return "Removed from cart"
}

// cart total
function getCartTotal(): number {
  let totalPayment = 0;
  for (const item of cart) {
    const productDetail = products.find((p) => p.id === item.productId);
    if (productDetail) {
      const subtotal = productDetail.price * item.quantity;
      totalPayment += subtotal;
    }
  }
  return totalPayment;
}

// checkout
function checkout(): string {
  if (cart.length === 0) {
    return "Cart is empty";
  }
  for (const item of cart) {
    const product = getProductById(item.productId);
    if (product) {
      product.stock -= item.quantity;
    }
  }
  cart = [];
  return "Checkout success";
}

// get summary
function getProductSummary(): string[] {
  let result: string[] = []; 
  for (const product of products) {
    const text = `${product.name} - Rp${product.price} (Stock: ${product.stock})`;
    result.push(text);
  }
  return result;
}



// check product id
const checkProductId = getProductById(1)
console.log(getProductById(2))
console.log(getProductById(3))
console.log(checkProductId)

// add to cart
const addCart = addToCart(1, 5)
console.log(addCart)
console.log(addToCart(2,10))
console.log(cart)

// remove from cart
const removeCart = removeFromCart(1)
console.log(removeCart)
console.log(cart)

// get cart total
console.log("Total Belanja: Rp.", getCartTotal());

// checkout
console.log(checkout())

// get summary
console.log(getProductSummary())