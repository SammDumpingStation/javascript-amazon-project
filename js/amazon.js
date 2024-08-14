import {
  cart,
  addToCart,
  updateCartQuantity,
  cartCount,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyConvert } from "./utils/money.js";

let productContainer = document.querySelector(".products-grid");

showProducts();
const addToCartButton = document.querySelectorAll(".js-add-to-cart");

addToCartButton.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const quantityValue = document.querySelector(
      `.js-quantity-selector-${productId}`
    ).value;
    const quantityToNum = +quantityValue;

    saveMessage(productId);
    addToCart(productId, quantityToNum);
    updateCartQuantity();
    document.querySelector(".cart-quantity").innerHTML = cartCount;
  });
});

//Functions
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
            $${moneyConvert(value.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${value.id}">
              ${option()}
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-saved-product-${value.id}">
         
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            value.id
          }">
            Add to Cart
          </button>
        </div>`;
    productContainer.innerHTML += productsCard;
  });
  document.querySelector(".cart-quantity").innerHTML = cartCount;
}

function option() {
  let options = "";
  for (let index = 1; index < 11; index++) {
    options += `<option value="${index}" ">${index}</option>
`;
  }
  return options;
}

function saveMessage(productId) {
  let timeout;
  const productSaved = document.querySelector(`.js-saved-product-${productId}`);
  productSaved.innerHTML = `<img src="images/icons/checkmark.png"> Added`;
  productSaved.classList.add("show");
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    productSaved.classList.remove("show");
  }, 2000);
}
