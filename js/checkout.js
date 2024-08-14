import { cart, removeFromCart, cartCount } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyConvert } from "./utils/money.js";

showCheckout();
const updateLink = document.querySelectorAll(".js-update-cart-item");
const deleteLink = document.querySelectorAll(".js-delete-cart-item");

updateLink.forEach((link) => {
  link.addEventListener("click", () => {
    const updateId = link.dataset.updateProductId;
    const cartContainer = document.querySelector(
      `.cart-item-container`
    );
    cartContainer.classList.add('is-editing-quantity');
  });
});

deleteLink.forEach((link) => {
  link.addEventListener("click", () => {
    const deleteId = link.dataset.productId;
    removeFromCart(deleteId);
    document.querySelector(".js-item-count").innerHTML = `${cartCount} items`;
    const cartContainer = document.querySelector(
      `.js-cart-item-container-${deleteId}`
    );
    cartContainer.remove();
  });
});

function showCheckout() {
  cart.forEach((cartItem) => {
    let matchingItem;

    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        matchingItem = product;
      }
    });

    document.querySelector(".order-summary").innerHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${moneyConvert(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span data-update-product-id="${
              cartItem.productId
            }" class="update-quantity-link link-primary js-update-cart-item">
              Update <input class="quantity-input type="text"><span class="save-quantity-link link-primary">Save</span>
            </span>
            <span data-product-id="${
              cartItem.productId
            }" class="js-delete-cart-item delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
  });
  document.querySelector(".js-item-count").innerHTML = `${cartCount} items`;
}
