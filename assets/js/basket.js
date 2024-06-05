let basket = JSON.parse(localStorage.getItem("basket")) || [];
const addedProduct = document.querySelector(".added-products");
const totalAmount = document.querySelector(".totalAmount");
let counterBasket = document.querySelector(".counterBasket");
const deleteAllBasket = document.querySelector(".deleteAllBasket");
const cashButton = document.querySelector(".cash-button");
const counterFav = document.querySelector(".counterFav");
const favBasket = JSON.parse(localStorage.getItem("favBasket")) || [];
const favPage = document.querySelector(".favPage");

favPage.addEventListener("click", () => {
  document.location.href = "../../favorites.html";
});

function FavoriteCounter() {
  counterFav.innerText = favBasket.length;
}

cashButton.addEventListener("click", () => {
  if (basket.length === 0) {
    // alert('Basket is empty');
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Basket is empty",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  } else {
    console.log(basket);
  }
});

addedProduct.innerHTML = "";

function updateCounterBasket() {
  let totalCount = basket.reduce((acc, item) => acc + item.count, 0);
  counterBasket.innerText = totalCount;
}
updateCounterBasket();

function updateBasketCount() {
  let totalCount = basket.reduce((acc, item) => acc + item.count, 0);
  counterBasket.innerText = totalCount;
}

async function createBasketELement() {
  addedProduct.innerHTML = "";
  let total = 0;
  basket.forEach((elem) => {
    const productItem = document.createElement("div");
    const productItemImgDiv = document.createElement("div");
    const productItemImg = document.createElement("img");
    const productItemInfo = document.createElement("div");
    const productItemTitle = document.createElement("h5");
    const productItemPrice = document.createElement("h3");
    const basketDescription = document.createElement("p");
    const quantityText = document.createElement("p");
    const quantityProd = document.createElement("div");
    const minusButton = document.createElement("button");
    const quantityAmount = document.createElement("p");
    const plusButton = document.createElement("button");
    const addRemove = document.createElement("div");
    const addTofav = document.createElement("div");
    const firstHeart = document.createElement("i");
    const clickedHeart = document.createElement("i");
    const favoriteText = document.createElement("p");
    const removeFromBasket = document.createElement("div");
    const trashIcons = document.createElement("i");
    const removeText = document.createElement("p");

    productItem.className = "product";
    productItemImgDiv.className = "product-image";
    productItemInfo.className = "product-info";
    productItemTitle.className = "productItemTitle";
    productItemPrice.className = "productItemPrice";
    basketDescription.className = "basketDescription";
    quantityText.className = "quantityText";
    quantityProd.className = "quantityProd";
    minusButton.className = "minusButton";
    quantityAmount.className = "quantityAmount";
    plusButton.className = "plusButton";
    addRemove.className = "add-remove";
    addTofav.className = "addTofav";
    firstHeart.className = "fa-regular fa-heart firstHeart";
    clickedHeart.className = "fa-solid fa-heart clickedHeart";
    favoriteText.className = "favoriteText";
    removeFromBasket.className = "removeFromBasket";
    trashIcons.className = "fa-solid fa-trash";
    removeText.className = "removeText";

    let newPrice = elem.count * elem.price;
    addTofav.addEventListener("click", () => {
      addToFav(elem);
      FavoriteCounter();
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
        Toastify({
          text: "Item removed from favorites",

          duration: 2000,
        }).showToast();
      }
      FavoriteCounter();
    }

    const isFavorite = favBasket.some((item) => item.id === elem.id);
    if (isFavorite) {
      firstHeart.style.display = "none";
      clickedHeart.style.display = "inline-block";
    } else {
      firstHeart.style.display = "inline-block";
      clickedHeart.style.display = "none";
    }

    function addingFavs() {
      if (firstHeart.style.display === "none") {
        firstHeart.style.display = "inline-block";
        clickedHeart.style.display = "none";
        removeFromFav(elem);
        cardItem.remove();
      } else {
        firstHeart.style.display = "none";
        clickedHeart.style.display = "inline-block";
        addToFav(elem);
      }
      FavoriteCounter();
    }

    addTofav.addEventListener("click", addingFavs);
    minusButton.addEventListener("click", () => {
      elem.count -= 1;
      quantityAmount.innerText = elem.count;
      newPrice = elem.count * elem.price;
      productItemPrice.innerText = `US $${newPrice}`;
      localStorage.setItem("basket", JSON.stringify(basket));
      createBasketELement();
      updateBasketCount();
      if (elem.count == 0) {
        removeBasket();
        // createBasketELement()
        localStorage.setItem("basket", JSON.stringify(basket));
        createBasketELement();
      }
    });
    plusButton.addEventListener("click", () => {
      elem.count += 1;
      quantityAmount.innerText = elem.count;
      newPrice = elem.count * elem.price;
      productItemPrice.innerText = `US $${newPrice}`;
      localStorage.setItem("basket", JSON.stringify(basket));
      createBasketELement();
      updateBasketCount();
    });

    function totalFInder() {
      totalAmount.innerHTML = "";
      total = total + newPrice;
      // console.log(total)
      totalAmount.innerText = "US $" + total;
    }
    totalFInder();

    function removeBasket() {
      const index = basket.findIndex((item) => item.id === elem.id);
      if (index !== -1) {
        basket.splice(index, 1);
        localStorage.setItem("basket", JSON.stringify(basket));
        createBasketELement();
        FavoriteCounter();
      }
    }
    removeFromBasket.addEventListener("click", removeBasket);

    if (elem.count == 0) {
      removeBasket();
      // createBasketELement()
      localStorage.setItem("basket", JSON.stringify(basket));
      createBasketELement();
      FavoriteCounter();
    }

    deleteAllBasket.addEventListener("click", () => {
      basket = [];
      localStorage.setItem("basket", JSON.stringify(basket));
      addedProduct.innerHTML = "";
      counterBasket.innerText = "0";
      totalAmount.innerText = "US $0";
    });

    productItemImg.src = elem.image;
    productItemTitle.innerText = elem.title.slice(0, 35);
    productItemPrice.innerText = `US $${elem.count * elem.price}`;
    basketDescription.innerText = elem.description.slice(0, 200);
    quantityText.innerText = "Quantity";
    minusButton.innerText = "-";
    quantityAmount.innerText = elem.count;
    plusButton.innerText = "+";
    favoriteText.innerText = "Favorite";
    removeText.innerText = "Remove";

    productItem.append(productItemImgDiv, productItemInfo);
    productItemImgDiv.append(productItemImg);
    productItemInfo.append(
      productItemTitle,
      productItemPrice,
      basketDescription,
      quantityText,
      quantityProd,
      addRemove,
      removeFromBasket
    );
    quantityProd.append(minusButton, quantityAmount, plusButton);
    addRemove.append(addTofav, removeFromBasket);
    addTofav.append(firstHeart, clickedHeart, favoriteText);
    removeFromBasket.append(trashIcons, removeText);

    addedProduct.append(productItem);
  });

  updateBasketCount();
}

createBasketELement();

FavoriteCounter();
