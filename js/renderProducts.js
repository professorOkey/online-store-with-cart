import productsData from "../products.json" assert { type: "json" };
import { cartCounter } from "./app.js";
import { cart } from "./cart.js";

const productsCatalog = document.querySelector(".products__catalog");

const renderProducts = (element) => {
  productsCatalog.insertAdjacentHTML(
    "beforeend",
    `
    <div class="catalog__item">
        <div class="item__img"><img src="${element.img}" alt=""></div>
        <div class="item__description">${element.description}</div>
        <div class="item__price">$${element.cost}</div>
        <button class="item__cart-add" id="${element.id}">Add to cart</button>
    </div>
    `
  );

  const addToCartButton = document.getElementById(`${element.id}`);
  addToCartButton.addEventListener("click", () => {
    productsData.forEach((product) => {
      if (addToCartButton.id === product.id) {
        cart.includes(product) ? product.amount++ : cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        cartCounter.innerText = cart.length;
      }
    });
  });
};

export { renderProducts, productsCatalog };
