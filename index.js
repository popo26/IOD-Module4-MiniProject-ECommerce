let homeImage = "";
const categoryArray = [".women", ".men", ".jewelery", ".electronics"];

//Days.js for footer
document.querySelector(".year").innerHTML = dayjs().year();

//sessionStorage is used so that count is persistent during session, instead of localStorage.
window.onload = function () {
  const itemCount = sessionStorage.getItem("itemCount");
  document.querySelector(".itemCount").innerHTML = itemCount;
};

// template to create home image
function homeImagesShow(image, title) {
  // clone the template
  const template = document
    .getElementById("homeImages-template")
    .content.cloneNode(true);
  // populate the template
  template.querySelector(".homeImage").src = image;
  template.querySelector(".homeImage").alt = title;
  // include the populated template into the page
  document.querySelector("#homeImages-show").appendChild(template);
}

// template to create individual item displayed per categories
function addCard(title, price, image, id) {
  // clone the template
  const template = document
    .getElementById("card-template")
    .content.cloneNode(true);
  // populate the template
  template.querySelector(".card-image").src = image;
  template.querySelector(".card-image").alt = title;
  template.querySelector(".card-id").innerText = id;
  // adding click event for individual item.
  template.querySelector(".card-link").classList.add(`id${id}`);
  template.querySelector(`.id${id}`).addEventListener("click", function (e) {
    let inputId = id;
    localStorage.setItem("myId", inputId);
    window.location.href = "/pages/item.html";
  });
  template.querySelector(".card-title").innerText = title;
  template.querySelector(".card-price").innerText = price + " NZD";
  // include the populated template into the page
  document.querySelector("#card-list").appendChild(template);
}

axios
  .get("https://fakestoreapi.com/products")
  .then((response) => {
    const data = response.data;
    // randomise image on home page
    homeImage = data[Math.floor(Math.random() * data.length)];
    homeImagesShow(homeImage.image, homeImage.title);
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    alert("Error retrieving information.");
  });

// adding click event for each categories in the nav bar.
for (let key in categoryArray) {
  //console.log(categoryArray[key]);
  document
    .querySelector(categoryArray[key])
    .addEventListener("click", function (event) {
      event.preventDefault();

      if (document.querySelector(".card-div")) {
        while (document.querySelector("#card-list").firstChild) {
          document.querySelector("#card-list").firstChild.remove();
        }
      }
      document.querySelector("#homeImages-show").style.display = "none";
      (categoryArray[key] === ".women"
        ? axios.get(
            "https://fakestoreapi.com/products/category/women's%20clothing"
          )
        : categoryArray[key] === ".men"
        ? axios.get(
            `https://fakestoreapi.com/products/category/men\'s%20clothing`
          )
        : axios.get(
            `https://fakestoreapi.com/products/category/${categoryArray[
              key
            ].substring(1)}`
          )
      )
        .then((response) => {
          const data = response.data;
          //console.log(response.data);
          data.forEach((item) => {
            addCard(item.title, item.price, item.image, item.id);
          });
        })
        .catch((error) => {
          console.error(`Error: ${error.message}`);
          alert("Error retrieving information.");
        });
    });
}
