// // Original
// // variable to track the clicking count of Add button
// let itemCount;

// // receiving item id to display. One-off so don't need sessionStorage
// window.onload = function () {
//   let value = localStorage.getItem("myId");
// };

// let myId = localStorage.getItem("myId");

// axios
//   .get(`https://fakestoreapi.com/products/${myId}`)
//   .then((response) => {
//     const data = response.data;
//     document.querySelector(".item-image").src = data.image;
//     document.querySelector(".item-image").alt = data.title;
//     document.querySelector(".item-price").innerHTML = `${data.price} NZD`;
//     document.querySelector(".item-title").innerHTML = data.title;
//     document.querySelector(".item-description").innerHTML = data.description;
//     document.querySelector(".item-rating").innerHTML = data.rating.rate;
//   })
//   .catch((error) => {
//     console.error(`Error: ${error.message}`);
//     alert("Error retrieving information.");
//   });

// // // Days.js for footer
// // document.querySelector(".year").innerHTML = dayjs().year();

// // adding click event to track cliking count of Add button.
// // As the count required to be persistent during session, sessionStorage is used.
// document.querySelector(".add-btn").addEventListener("click", function (e) {
//   // ternary operator to set 0 for initial value of itemCount variable
//   // to avoid error since it's initially undefined.
//   sessionStorage.setItem(
//     "itemCount",
//     !sessionStorage["itemCount"] ? 0 : sessionStorage["itemCount"]
//   );
//   // value of sessionStorage is not number so using parseInt.
//   let currentValue = parseInt(sessionStorage["itemCount"]);
//   sessionStorage["itemCount"] = currentValue + 1;
//   window.location.href = "/index.html";
// });

// =========================Try1 with Class ========================

// variable to track the clicking count of Add button
let itemCount;

// receiving item id to display. One-off so don't need sessionStorage
window.onload = function () {
  let value = localStorage.getItem("myId");
};

let myId = localStorage.getItem("myId");

class Item {
  constructor(id) {
    this.id = id;
  }

  getItem() {
    axios
      .get(`https://fakestoreapi.com/products/${this.id}`)
      .then((response) => {
        const data = response.data;
        document.querySelector(".item-image").src = data.image;
        document.querySelector(".item-image").alt = data.title;
        document.querySelector(".item-price").innerHTML = `${data.price} NZD`;
        document.querySelector(".item-title").innerHTML = data.title;
        document.querySelector(".item-description").innerHTML =
          data.description;
        document.querySelector(".item-rating").innerHTML = data.rating.rate;
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        alert("Error retrieving information.");
      });

    // adding click event to track cliking count of Add button.
    // As the count required to be persistent during session, sessionStorage is used.
    document.querySelector(".add-btn").addEventListener("click", function (e) {
      // ternary operator to set 0 for initial value of itemCount variable
      // to avoid error since it's initially undefined.
      sessionStorage.setItem(
        "itemCount",
        !sessionStorage["itemCount"] ? 0 : sessionStorage["itemCount"]
      );
      // value of sessionStorage is not number so using parseInt.
      let currentValue = parseInt(sessionStorage["itemCount"]);
      sessionStorage["itemCount"] = currentValue + 1;
      window.location.href = "/index.html";
    });
  }
}

const selectedItem = new Item(myId);
selectedItem.getItem();
