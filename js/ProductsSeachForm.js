import productsData from "../products.json" assert { type: "json" };
import { productsCatalog, renderProducts } from "./renderProducts.js";

const searchByNameButton = document.querySelector(".search__button");
const companyFilter = document.querySelector(".company__list");
const searchByPriceButton = document.querySelector(".price__submit");

const filterByName = (name) => {
  productsData.forEach((product) => {
    if (product.name.toLowerCase() === name.toLowerCase()) {
      productsCatalog.innerHTML = "";
      renderProducts(product);
    }
  });
};

const filterByCompany = (company) => {
  productsCatalog.innerHTML = "";
  if (company !== "ALL") {
    productsData.forEach((product) => {
      if (product.company.toLowerCase() === company.toLowerCase()) {
        renderProducts(product);
      }
    });
  } else {
    productsData.forEach((product) => {
      renderProducts(product);
    });
  }
};

const filterByPrice = (priceFrom, priceTo) => {
  productsCatalog.innerHTML = "";
  productsData.forEach((product) => {
    if (+product.cost >= +priceFrom && +product.cost <= +priceTo) {
      renderProducts(product);
    }
  });
};

searchByNameButton.addEventListener("click", () => {
  const inputValue = document.querySelector(".search__input").value;
  if (inputValue.length > 0) {
    filterByName(inputValue);
  }
});

companyFilter.addEventListener("click", (event) => {
  const filterChapter = event.target.innerText;
  filterByCompany(filterChapter);
});

searchByPriceButton.addEventListener("click", () => {
  const fromValue = document.querySelector(".input__from").value;
  const toValue = document.querySelector(".input__to").value;
  if (fromValue.length > 0 && toValue.length > 0) {
    filterByPrice(fromValue, toValue);
  }
});
