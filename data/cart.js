export const cart = [];

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
