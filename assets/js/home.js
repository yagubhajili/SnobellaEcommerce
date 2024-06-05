import { ProductURL } from "./baseURL.js";
import { getDatas } from "./request.js";

const favBasket = JSON.parse(localStorage.getItem("favBasket")) || [];
const basket = JSON.parse(localStorage.getItem("basket")) || [];
const rightBox = document.querySelector(".rightBox");
const basketPage = document.querySelector(".basketPage");
const favPage = document.querySelector(".favPage");
const counterFav = document.querySelector(".counterFav");
const counterBasket = document.querySelector(".counterBasket");
const SearchProd = document.querySelector(".SearchProd");
const SearchBtn = document.querySelector(".searchBtn");
const az = document.querySelector(".a-z");
const za = document.querySelector(".z-a");
const highToLow = document.querySelector(".high-low");
const lowToHigh = document.querySelector(".low-high");

let mainData = [];

function FavoriteCounter() {
  counterFav.innerText = favBasket.length;
}

function updateCounterBasket() {
  let totalCount = basket.reduce((acc, item) => acc + item.count, 0);
  counterBasket.innerText = totalCount;
}

async function createCart(data) {
  rightBox.innerHTML = "";
  data.forEach((element) => {
    const cardItem = document.createElement("div");
    const heart = document.createElement("div");
    const heartIcon = document.createElement("i");
    const heartIconClicked = document.createElement("i");
    const bag = document.createElement("div");
    const prodImg = document.createElement("img");
    const prodTitle = document.createElement("h3");
    const prodAbout = document.createElement("p");
    const prodPrice = document.createElement("h4");
    const basketBtn = document.createElement("button");

    cardItem.className = "cardItem";
    heart.className = "heart";
    heartIcon.className = "fa-regular fa-heart firstHeart";
    heartIconClicked.className = "fa-solid fa-heart clickedHeart";
    bag.className = "bag";
    prodTitle.className = "prodTitle";
    prodAbout.className = "about";
    prodPrice.className = "price";
    basketBtn.className = "basketBtn";

    prodImg.src = element.image;
    prodTitle.innerText = element.title.slice(0, 25);
    prodAbout.innerText = element.description.slice(0, 100);
    prodPrice.innerText = "$" + element.price;
    basketBtn.innerText = "Add to cart";

    heart.setAttribute("data", element.id);
    const isFavorite = favBasket.some((item) => item.id === element.id);

    if (isFavorite) {
      heartIcon.style.display = "none";
      heartIconClicked.style.display = "inline-block";
    } else {
      heartIcon.style.display = "inline-block";
      heartIconClicked.style.display = "none";
    }

    function addingFavs() {
      if (heartIcon.style.display === "none") {
        heartIcon.style.display = "inline-block";
        heartIconClicked.style.display = "none";
        removeFromFav(element);
      } else {
        heartIcon.style.display = "none";
        heartIconClicked.style.display = "inline-block";
        addToFav(element);
      }
      FavoriteCounter();
    }

    heart.addEventListener("click", () => {
      addingFavs();
    });

    function addToFav(product) {
      const index = favBasket.findIndex((item) => item.id === product.id);
      if (index === -1) {
        favBasket.push(product);
        Toastify({
          text: "Item added to favorites",

          duration: 2000,
        }).showToast();
      }
      localStorage.setItem("favBasket", JSON.stringify(favBasket));
      FavoriteCounter();
    }

    function removeFromFav(product) {
      const index = favBasket.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        favBasket.splice(index, 1);
        localStorage.setItem("favBasket", JSON.stringify(favBasket));

      }
      Toastify({
        text: "Item removed from favorites",

        duration: 2000,
      }).showToast();
      FavoriteCounter();
    }

    basketBtn.addEventListener("click", () => {
      addToCart(element);
      updateCounterBasket();
    });

    function addToCart(product) {
      const index = basket.findIndex((item) => item.id === product.id);
      if (index === -1) {
        product.count = 1;
        basket.push(product);
        Toastify({
          text: "Item added to basket",

          duration: 2000,
        }).showToast();
      } else {
        product.count += 1;
      }
      localStorage.setItem("basket", JSON.stringify(basket));
      updateCounterBasket();
    }

    basketPage.addEventListener("click", () => {
      document.location.href = "../../shopping.html";
    });

    favPage.addEventListener("click", () => {
      document.location.href = "../../favorites.html";
    });

    cardItem.append(heart, bag, prodTitle, prodAbout, prodPrice, basketBtn);
    heart.append(heartIcon, heartIconClicked);
    bag.append(prodImg);
    rightBox.append(cardItem);
  });
}

async function start() {
  mainData = await getDatas(ProductURL);
  createCart(mainData);
  FavoriteCounter();
  updateCounterBasket();
}

start();

SearchBtn.addEventListener("click", () => {
  const filteredData = mainData.filter((elem) =>
    elem.title.toUpperCase().includes(SearchProd.value.toUpperCase())
  );
  createCart(filteredData);
});

SearchProd.addEventListener("input", () => {
  const filteredData = mainData.filter((elem) =>
    elem.title.toUpperCase().includes(SearchProd.value.toUpperCase())
  );
  createCart(filteredData);
});

highToLow.addEventListener("click", () => {
  const filteredData = mainData.slice().sort((a, b) => b.price - a.price);
  createCart(filteredData);
});

lowToHigh.addEventListener("click", () => {
  const filteredData = mainData.slice().sort((a, b) => a.price - b.price);
  createCart(filteredData);
});

az.addEventListener("click", () => {
  const filteredData = mainData
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));
  createCart(filteredData);
});

za.addEventListener("click", () => {
  const filteredData = mainData
    .slice()
    .sort((a, b) => b.title.localeCompare(a.title));
  createCart(filteredData);
});
