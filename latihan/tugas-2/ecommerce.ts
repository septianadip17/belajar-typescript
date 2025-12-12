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
  for (const product of products) {
    if (product.id === id) {
      return product
    }
  }
  return undefined
}

// add to cart
function addToCart(productId: number, quantity: number): string {
  if (quantity <= 0) {
    return "Invalid quantity"
  }
  for (const product of products) {
    if (product.id === productId) {
      return "Product not found"
    } else if (product.stock <= quantity) {
      return "Out of stock"
    }
  }
  return "Added to cart"
}

// check product id
const checkProductId = getProductById(1)
console.log(checkProductId)

// add to cart

const addCart = addToCart(1, 2)