import {
  cart,
  removeFromCart,
  cartCount,
  updateCart,
  updateCheckState,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyConvert } from "./utils/money.js";
import { deliveryOptions } from "../data/delivery-options.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const today = dayjs();
// const deliveryDate = today.add(7, "days");
// console.log(deliveryDate.format("dddd, MMMM d"));

showCheckout();

function showCheckout() {
  let checkoutList = document.querySelector(".order-summary");
  checkoutList.innerHTML = "";
  cart.forEach((cartItem) => {
    let matchingItem;

    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        matchingItem = product;
      }
    });

    const deliveryId = cartItem.deliveryTimeId;
    let matchingOption;

    deliveryOptions.forEach((deliveryOption) => {
      if (deliveryId === deliveryOption.id) {
        matchingOption = deliveryOption;
      }
    });
    const timeAdded = today.add(matchingOption.deliveryTime, "days");

    checkoutList.innerHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: ${timeAdded.format("dddd, MMMM D")}
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
            <span class="update-quantity-link link-primary"> 
              <span data-update-product-id="${
                matchingItem.id
              }" class="update-word js-update-cart-item">Update</span>
              <input class="quantity-input quantity-input-${
                matchingItem.id
              }" type="text" value="${cartItem.quantity}"/>
              <span data-save-link-id="${
                matchingItem.id
              }" class="save-quantity-link link-primary">Save</span
              >
            </span>
            <span data-product-id="${
              matchingItem.id
            }" class="js-delete-cart-item delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="deliver y-options-title">
            Choose a delivery option:
          </div>
            ${renderDeliveryOptions(matchingItem, cartItem)}
        </div>
      </div>
    </div>
`;
  });
  document.querySelector(".js-item-count").innerHTML = `${cartCount} items`;

  updateLink();
  saveLink();
  deleteLink();
  updateDeliveryOption();
}

function updateLink() {
  const updateLink = document.querySelectorAll(".js-update-cart-item");
  updateLink.forEach((link) => {
    link.addEventListener("click", () => {
      const updateId = link.dataset.updateProductId;
      const cartContainer = document.querySelector(
        `.js-cart-item-container-${updateId}`
      );
      cartContainer.classList.add("is-editing-quantity");
    });
  });
}

function saveLink() {
  const saveLinks = document.querySelectorAll(".save-quantity-link");
  saveLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const saveId = link.dataset.saveLinkId;
      const cartContainer = document.querySelector(
        `.js-cart-item-container-${saveId}`
      );

      const saveInput = Number(
        document.querySelector(`.quantity-input-${saveId}`).value
      );
      updateCart(saveId, saveInput);
      cartContainer.classList.remove("is-editing-quantity");
      showCheckout();
    });
  });
}

function deleteLink() {
  const deleteLink = document.querySelectorAll(".js-delete-cart-item");
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
}

function renderDeliveryOptions(matchingItem, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const timeAdded = today.add(deliveryOption.deliveryTime, "days");
    html += `
      <div class="delivery-option js-delivery-option" data-product-id="${
        matchingItem.id
      }" data-delivery-id="${deliveryOption.id}">
        <input type="radio" ${
          cartItem.deliveryTimeId === deliveryOption.id ? "checked" : ""
        }
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${timeAdded.format("dddd, MMMM D")}
          </div>
          <div class="delivery-option-price">
            ${
              deliveryOption.priceCents === 0
                ? "FREE"
                : `$${moneyConvert(deliveryOption.priceCents)}`
            } - Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

function updateDeliveryOption() {
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryId } = element.dataset;
      
      updateCheckState(productId, deliveryId);
      showCheckout();
    });
  });
}
