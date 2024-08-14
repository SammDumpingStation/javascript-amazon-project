let productContainer = document.querySelector(".products-grid");

function showProducts() {
  productContainer.innerHTML = "";
  products.forEach((value) => {
    const productsCard = `        
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${value.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${value.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${value.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${value.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(value.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              ${option()}
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`;
    productContainer.innerHTML += productsCard;
  });
}

function option() {
  let options = "";
  for (let index = 1; index < 11; index++) {
    options += `<option value="${index}">${index}</option>
`;
  }
  return options;
}

showProducts();
