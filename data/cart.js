export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function addToCart(productId, quantityToNum) {
  let existingProduct;

  cart.forEach((item) => {
    if (productId === item.productId) {
      existingProduct = item;
    }
  });
  if (existingProduct) {
    existingProduct.quantity += quantityToNum;
  } else {
    cart.push({
      productId: productId,
      quantity: quantityToNum,
    });
  }
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
}
