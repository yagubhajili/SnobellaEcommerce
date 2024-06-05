// favorite.js

const favBasket = JSON.parse(localStorage.getItem("favBasket")) || [];
const favCards = document.querySelector(".rightBox");
const counterFav = document.querySelector(".counterFav");
const deleteAll = document.querySelector(".btn-danger");
const SearchProd = document.querySelector(".SearchProd");
const SearchBtn = document.querySelector(".searchBtn");
const az = document.querySelector(".a-z");
const za = document.querySelector(".z-a");
const highToLow = document.querySelector(".high-low");
const lowToHigh = document.querySelector(".low-high");
let counterBasket = document.querySelector(".counterBasket");
const basket = JSON.parse(localStorage.getItem("basket")) || [];

function updateCounterBasket() {
  let totalCount = basket.reduce((acc, item) => acc + item.count, 0);
  counterBasket.innerText = totalCount;
}

const basketPage = document.querySelector(".basketPage");

basketPage.addEventListener("click", () => {
  document.location.href = "../../shopping.html";
});

deleteAll.addEventListener("click", () => {
  favBasket.length = 0;
  localStorage.removeItem("favBasket");
  favCards.innerHTML = "";
  FavoriteCounter();
});

function FavoriteCounter() {
  counterFav.innerText = favBasket.length;
}

let mainData = [];

async function createFav(data) {
  favCards.innerHTML = "";
  const itemsToDisplay = data || favBasket;
  itemsToDisplay.forEach((element) => {
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
    basketBtn.innerText = "Add to card";

    cardItem.append(heart, bag, prodTitle, prodAbout, prodPrice, basketBtn);
    heart.append(heartIcon, heartIconClicked);
    bag.append(prodImg);
    favCards.append(cardItem);

    basketBtn.addEventListener("click", () => {
      addToCart(element);
      updateCounterBasket();
    });

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
        cardItem.remove();
      } else {
        heartIcon.style.display = "none";
        heartIconClicked.style.display = "inline-block";
        addToFav(element);
      }
      FavoriteCounter();
    }

    heart.addEventListener("click", addingFavs);
  });
}

function removeFromFav(product) {
  const index = favBasket.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    favBasket.splice(index, 1);
    localStorage.setItem("favBasket", JSON.stringify(favBasket));
  }
  FavoriteCounter();
}


SearchBtn.addEventListener("click", () => {
  const filteredData = favBasket.filter((elem) =>
    elem.title.toUpperCase().includes(SearchProd.value.toUpperCase())
  );
  createFav(filteredData);
});

SearchProd.addEventListener("input", () => {
  const filteredData = favBasket.filter((elem) =>
    elem.title.toUpperCase().includes(SearchProd.value.toUpperCase())
  );
  createFav(filteredData);
});

highToLow.addEventListener("click", () => {
  const filteredData = favBasket.slice().sort((a, b) => b.price - a.price);
  createFav(filteredData);
});

lowToHigh.addEventListener("click", () => {
  const filteredData = favBasket.slice().sort((a, b) => a.price - b.price);
  createFav(filteredData);
});

az.addEventListener("click", () => {
  const filteredData = favBasket
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));
  createFav(filteredData);
});

za.addEventListener("click", () => {
  const filteredData = favBasket
    .slice()
    .sort((a, b) => b.title.localeCompare(a.title));
  createFav(filteredData);
});


createFav();
FavoriteCounter();
updateCounterBasket();
