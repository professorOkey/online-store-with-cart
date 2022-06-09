import {
  renderCartScreen,
  cart,
  renderCartProduct,
  renderTotal,
} from "./cart.js";

const cartIcon = document.querySelector(".header__cart");
export let cartCounter = document.querySelector(".cart__counter-value");
cartCounter.innerText = cart.length;

cartIcon.addEventListener("click", () => {
  renderCartScreen();
  cart.forEach((cartItem) => {
    renderCartProduct(cartItem);
  });
  renderTotal();
  document.body.classList.add("active-cart");
});
