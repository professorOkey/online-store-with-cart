import { cartCounter } from "./app.js";

let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

const renderCartScreen = () => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
            <section class="cart__screen">
                <div class="cart__body">
                    <div class="cart__close"></div>
                    <div class="cart__title">Your Bag</div>
                    <ul class="cart__list"></ul>
                    <div class="cart__total">
                        <div class="total__price"></div>
                        <div class="total__checkout">CHECKOUT</div>
                    </div>
                </div>
            </section>
            `
  );

  const cartScreen = document.querySelector(".cart__screen");
  const checkOut = document.querySelector(".total__checkout");

  cartScreen.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("cart__screen") ||
      event.target.classList.contains("cart__close")
    ) {
      cartScreen.remove();
      document.body.classList.remove("active-cart");
      cartCounter.innerText = cart.length;
    }
  });

  checkOut.addEventListener("click", () => {
    const cartProductList = document.querySelector(".cart__list");
    localStorage.clear();
    cart = [];
    cartCounter.innerText = 0;
    cartProductList.innerHTML = "";
    renderTotal();
  });
};

const renderCartProduct = (element) => {
  const cartProductList = document.querySelector(".cart__list");
  cartProductList.insertAdjacentHTML(
    "beforeend",
    `
  <li class="list__chosen-product" id="${element.id}">
    <div class="chosen-product__img"><img src="${element.img}" alt=""></div>
    <div class="chosen-product__description">
      <div class="description__title">${element.name} </div>
      <div class="description__price">$${element.cost}</div>
      <div class="description__remove-chosen remove${element.id}">remove</div>
    </div>
    <div class="chosen-product__amount">
      <div class="amount__plus"></div>
      <div class="amount__current${element.id}">${element.amount}</div>
      <div class="amount__minus"></div>
    </div> 
  </li>
  `
  );

  const removeButton = document.querySelector(`.remove${element.id}`);
  const amountCurrent = document.querySelector(`.amount__current${element.id}`);
  const amountPlus = document.getElementById(`${element.id}`);

  amountPlus.addEventListener("click", (event) => {
    if (event.target.classList.contains("amount__plus")) {
      element.amount++;
      amountCurrent.innerHTML = element.amount;
      renderTotal();
    }
    if (
      event.target.classList.contains("amount__minus") &&
      element.amount !== 1
    ) {
      element.amount--;
      amountCurrent.innerHTML = element.amount;
      renderTotal();
    }
  });

  removeButton.addEventListener("click", () => {
    cart.forEach((product) => {
      if (product.id === element.id) {
        const deleteTargetIndex = cart.indexOf(product);
        cart.splice(deleteTargetIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
    removeButton.parentNode.parentNode.remove();
    renderTotal();
  });
};

const renderTotal = () => {
  const totalText = document.querySelector(".total__price");
  let total = 0;
  cart.forEach((product) => {
    total += product.cost * product.amount;
  });
  totalText.innerHTML = `Total:$${total.toFixed(2)}`;
};

export { cart, renderCartScreen, renderCartProduct, renderTotal };
