//Original
// let myChart = echarts.init(document.getElementById("productsChart"));

// fetch("https://fakestoreapi.com/products")
//   .then((response) => response.json()) // transforming to json text to javascript object  (i.e., json() method)
//   .then((products) => {
//     //================ With Array ================
//     let listOfProductPerCategory = [];
//     let count = {};
//     let typeArr = [];
//     let countArray = [];
//     let priceTotalPerCategory = [];
//     // Extracting category name for each object so there are lots of duplicates
//     console.log(products)

//     products.forEach((product) => {
//       listOfProductPerCategory.push(product.category);
//     });

//     // Counting category names in listOfProductPerCategory then
//     // adding the category name as key and the count as value as an object
//     listOfProductPerCategory.forEach((element) => {
//       count[element] = (count[element] || 0) + 1;
//     });

//     // separating keys and values as separate arrays to use Apache Echart's xAxis and yAxis
//     for (let x in count) {
//       typeArr.push(x);
//       countArray.push(count[x]);
//     }

//     myChart.setOption({
//       //adding custom color for bars
//       color: ["#808080"],

//       xAxis: {
//         data: typeArr,
//         axisLabel: {
//           rotate: 45,
//           fontSize: 10,
//         },
//       },
//       yAxis: {},
//       series: [
//         {
//           name: "Categories",
//           type: "bar",
//           data: countArray,
//         },
//       ],
//     });
//   });

// // Days.js for footer
// document.querySelector(".year").innerHTML = dayjs().year();

// //Try2
// let myChart = echarts.init(document.getElementById("productsChart"));

// fetch("https://fakestoreapi.com/products")
//   .then((response) => response.json()) // transforming to json text to javascript object  (i.e., json() method)
//   .then((products) => {
//     //================ With Array ================
//     let listOfProductPerCategory = [];
//     let count = {};
//     let typeArr = [];
//     let countArray = [];
//     let priceTotalPerCategory = {};
//     let averageArray = [];
//     // Extracting category name for each object so there are lots of duplicates
//     //console.log(products)

//     products.forEach((product) => {
//       // let key = product.category;
//       listOfProductPerCategory.push({ [product.category]: product.price });
//     });
//     console.log(listOfProductPerCategory);

//     // Counting category names in listOfProductPerCategory then
//     // adding the category name as key and the count as value as an object
//     listOfProductPerCategory.forEach((element) => {
//       // console.log(Object.keys(element));
//       // console.log(parseFloat(Object.values(element)));

//       count[Object.keys(element)] = (count[Object.keys(element)] || 0) + 1;
//       priceTotalPerCategory[Object.keys(element)] =
//         (parseFloat(priceTotalPerCategory[Object.keys(element)]) || 0) +
//         parseFloat(Object.values(element));
//     });
//     console.log(count);
//     console.log(priceTotalPerCategory);

//     // separating keys and values as separate arrays to use Apache Echart's xAxis and yAxis
//     for (let x in count) {
//       typeArr.push(x);
//       countArray.push(count[x]);
//     }

//     //get average per category
//     for (let x in priceTotalPerCategory) {
//       // console.log(priceTotalPerCategory[x])
//       // console.log(count[x])
//       averageArray.push((priceTotalPerCategory[x] / count[x]).toFixed(2));
//     }

//     console.log(averageArray);

//     myChart.setOption({
//       //adding custom color for bars
//       color: ["#808080"],

//       // xAxis: {
//       //   data: typeArr,
//       //   axisLabel: {
//       //     rotate: 45,
//       //     fontSize: 10,
//       //   },
//       // },
//       xAxis: [
//         {
//           data: typeArr,
//           axisLabel: { rotate: 15, fontSize: 10 },
//         },
//         {
//           position: "bottom",
//           offset: 30,
//           axisLine: {
//             show: false,
//           },
//           axisTick: {
//             show: false,
//           },
//           data: averageArray.map((price) => `$${price}`),
//           axisLabel: { rotate: 15, fontSize: 10 },
//         },
//       ],
//       yAxis: {},
//       series: [
//         {
//           name: "Categories",
//           type: "bar",
//           data: averageArray,
//         },
//       ],
//     });
//   });

//let itemCount = 0;
//sessionStorage is used so that count is persistent during session, instead of localStorage.
window.onload = function () {
  const itemCount = sessionStorage.getItem("itemCount");
  // document.querySelector(".itemCount").innerHTML = itemCount;
  console.log("Total Count is " + itemCount);
  //sessionStorage.setItem("itemCount", itemCount);
  // randomItems(itemCount);

  if (itemCount < 1) {
    document.getElementById("cart-item-list").innerText =
      "No item has been added to your cart.";
  } else {
    randomItems(itemCount);
  }
};

// template to display results of search in nav bar
function showCartItems(title, price, image, id, count) {
  // clone the template
  const template = document
    .getElementById("cart-template")
    .content.cloneNode(true);
  // populate the template
  template.querySelector(".cart-image").src = image;
  template.querySelector(".cart-image").alt = title;
  template.querySelector(".cart-item-div").classList.add(`cartId${id}`);

  // adding id for debug purpose
  template.querySelector(".cart-id").innerText = id;
  // adding click event to identify each item to pass to item.html.
  template.querySelector(".cart-link").classList.add(`cartId${id}`);
  template
    .querySelector(`.cartId${id}`)
    .addEventListener("click", function (e) {
      let inputId = id;
      localStorage.setItem("myId", inputId);
      window.location.href = "../pages/item.html";
    });
  template.querySelector(".cart-title").innerText = title;
  template.querySelector(".cart-item-number").innerText = `${count} pc`;

  template.querySelector(".cart-price").innerText = price + " NZD";

  // adding click event to track cliking count of Add button.
  // As the count required to be persistent during session, sessionStorage is used.
  template
    .querySelector(".cart-remove-btn")
    .addEventListener("click", function (e) {
      let currentValue = parseInt(sessionStorage["itemCount"]);
      sessionStorage["itemCount"] = currentValue - 1;
      window.location.href = "";
    });

  // include the populated template into the page
  document.querySelector("#cart-item-list").appendChild(template);
}

// template to display results of search in nav bar
function showBreakdown(title, price, id) {
  const template = document
    .getElementById("breakdown-template")
    .content.cloneNode(true);

  // adding id for debug purpose
  // template.querySelector(".breakdown-id").innerText = id;

  template.querySelector(".breakdown-title").innerText = title;
  template.querySelector(".breakdown-item-number").innerText = "1 PC";
  template.querySelector(".breakdown-price").innerText = price + " NZD";

  // include the populated template into the page
  document.querySelector("#breakdown-list").appendChild(template);
}

function randomItems(num) {
  axios
    .get("https://fakestoreapi.com/products")
    .then((response) => {
      const data = response.data;

      for (let i = 0; i < num; i++) {
        const randomItem = data[Math.floor(Math.random() * data.length)];
        const cartIdDivs = document.querySelectorAll(".cart-id");
        let count = 1;
        if (cartIdDivs) {
          for (let x in cartIdDivs) {
            // console.log(document.querySelectorAll(".cart-id")[x].innerText)
            if (cartIdDivs[x].innerText == randomItem.id) {
              console.log("existing ID", cartIdDivs[x].innerText);
              count++;
              console.log(`count is ${count}`);
              // Hide duplicate item
              const dups = document.querySelectorAll(`.cartId${randomItem.id}`);

              for (let i = 0; i < dups.length; i++) {
                //console.log(dups[i])
                dups[i].style.display = "none";
              }
            }
          }
        }

        if (document.querySelector(`.cartId${randomItem.id}`)) {
          showCartItems(
            randomItem.title,
            randomItem.price * count,
            randomItem.image,
            randomItem.id,
            count
          );
        } else {
          showCartItems(
            randomItem.title,
            randomItem.price,
            randomItem.image,
            randomItem.id,
            count
          );
        }
        showBreakdown(randomItem.title, randomItem.price, randomItem.id);
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
      alert("Error retrieving information.");
    });
}

//Try3 with Class
class Chart {
  constructor(url) {
    this.url = url;
  }

  createChart() {
    const myChart = echarts.init(document.getElementById("productsChart"));

    fetch(this.url)
      .then((response) => response.json()) // transforming to json text to javascript object  (i.e., json() method)
      .then((products) => {
        //================ With Array ================
        let listOfProductPerCategory = [];
        let count = {};
        let typeArr = [];
        let countArray = [];
        let priceTotalPerCategory = {};
        let averageArray = [];
        // Extracting category name for each object so there are lots of duplicates
        //console.log(products)

        products.forEach((product) => {
          // let key = product.category;
          listOfProductPerCategory.push({ [product.category]: product.price });
        });
        //console.log(listOfProductPerCategory);

        // Counting category names in listOfProductPerCategory then
        // adding the category name as key and the count as value as an object
        listOfProductPerCategory.forEach((element) => {
          // console.log(Object.keys(element));
          // console.log(parseFloat(Object.values(element)));

          count[Object.keys(element)] = (count[Object.keys(element)] || 0) + 1;
          priceTotalPerCategory[Object.keys(element)] =
            (parseFloat(priceTotalPerCategory[Object.keys(element)]) || 0) +
            parseFloat(Object.values(element));
        });
        // console.log(count);
        // console.log(priceTotalPerCategory);

        // separating keys and values as separate arrays to use Apache Echart's xAxis and yAxis
        for (let x in count) {
          typeArr.push(x);
          //countArray.push(count[x]);
        }

        //get average per category
        for (let x in priceTotalPerCategory) {
          // console.log(priceTotalPerCategory[x])
          // console.log(count[x])
          averageArray.push((priceTotalPerCategory[x] / count[x]).toFixed(2));
        }

        //console.log(averageArray);
        myChart.setOption({
          //adding custom color for bars
          color: ["#808080"],
          xAxis: [
            {
              data: typeArr,
              axisLabel: { rotate: 15, fontSize: 10 },
            },
            {
              position: "bottom",
              offset: 30,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              data: averageArray.map((price) => `$${price}`),
              axisLabel: { rotate: 15, fontSize: 10 },
            },
          ],
          yAxis: {},
          series: [
            {
              name: "Categories",
              type: "bar",
              data: averageArray,
            },
          ],
        });
      });
  }
}

const myChart = new Chart("https://fakestoreapi.com/products");
myChart.createChart();
