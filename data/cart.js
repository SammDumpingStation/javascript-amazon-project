export let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
export let cartCount = JSON.parse(localStorage.getItem("cart-count")) ?? 0;

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function saveCartQuantity() {
  localStorage.setItem("cart-count", JSON.stringify(cartCount));
}

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
      deliveryTimeId: 1,
    });
  }
  saveToStorage();
  updateCartQuantity();
}

export function updateCart(productId, quantityToNum) {
  let existingProduct;

  cart.forEach((item) => {
    if (productId === item.productId) {
      existingProduct = item;
    }
  });

  if (existingProduct) {
    existingProduct.quantity = quantityToNum;
  }
  saveToStorage();
  updateCartQuantity();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
  updateCartQuantity();
}

export function updateCartQuantity() {
  cartCount = cart.length;
  saveCartQuantity();
}

export function updateCheckState(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });  
  matchingItem.deliveryTimeId = +deliveryOptionId;

  saveToStorage();
}
