//sessionStorage is used so that count is persistent during session, instead of localStorage.
window.onload = function () {
  const itemCount = sessionStorage.getItem("itemCount");
  console.log("Total Count is " + itemCount);

  if (itemCount < 1) {
    document.getElementById("cart-item-list").innerHTML =
      "<h4>No item has been added to your cart.</h4>";
  } else {
    document.getElementById("cart-item-list").innerHTML =
      "<h2>Your shopping cart ...</h2>";
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
  // To stop event bubbling
  template
    .querySelector(".cart-set-div")
    .addEventListener("click", function (e) {
      e.stopPropagation();
    });
  template
    .querySelector(".remove-btn-div")
    .addEventListener("click", function (e) {
      e.stopPropagation();
    });
  template.querySelector(".cart-link").classList.add(`cartId${id}`);
  template
    .querySelector(`.cartId${id}`)
    .addEventListener("click", function (e) {
      // e.stopPropagation();
      let inputId = id;
      localStorage.setItem("myId", inputId);
      window.location.href = "../pages/item.html";
    });
  template.querySelector(".cart-title").innerText = title;
  template.querySelector(".cart-item-number").innerText = `${count} pc`;
  template.querySelector(".cart-price").innerText = price + " NZD";
  template.querySelector(".cart-price").classList.add(`cartPriceId${id}`);

  // adding click event to decrease itemCount.
  // As the count required to be persistent during session, sessionStorage is used.
  template
    .querySelector(".cart-remove-btn")
    .addEventListener("click", function (e) {
      let currentValue = parseInt(sessionStorage["itemCount"]);
      sessionStorage["itemCount"] = currentValue - count;
    });
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

let sum = 0;

function grandTotal(id) {
  let partialSum = 0;
  const items = document.querySelectorAll(`.cartPriceId${id}`);
  const itemMap = new Map();

  items.forEach((item) => {
    if (itemMap.has(item.classList[1]) === false) {
      itemMap.set(item.classList[1], 1);
    } else {
      itemMap.set(item.classList[1], itemMap.get(item.classList[1]) + 1);
    }
  });

  for (let [key, value] of itemMap) {
    //console.log(key + " = " + value);
    const singlePrice = document.querySelector(`.${key}`).innerText;
    partialSum = parseFloat(singlePrice.substring(0, singlePrice.length - 3));

    if (value < 1) {
      sum -= partialSum;
    } else {
      sum += partialSum;
    }
  }
  console.log(`Sum is ${sum}`);
  document.getElementById("grand-total").innerText = `${sum.toFixed(2)} NZD`;
}

//   for (let i=0;i<items.length;i++){
//   //   if (items[i].style.display === "none") {
//   //     hiddenCount++;
//   //     console.log(`hidden count is ${hiddenCount}`)
//   //     console.log(`hiddenID is ${id}`)
//   //     // const singlePrice = document.querySelector(`.cartPriceId${id}`).innerText;
//   //     const singlePrice = items[i].innerText;
//   //     //console.log(parseFloat(singlePrice.substring(0, singlePrice.length-3)) * (hiddenCount));
//   //     partialSum = parseFloat(singlePrice.substring(0, singlePrice.length-3)) * (hiddenCount + 1)
//   //     // partialSum = parseFloat(singlePrice.substring(0, singlePrice.length-3))
//   //     sum -= partialSum;
//   //     console.log(`current sum1 is ${sum}`)
//   //   } else {

//   console.log(items[i].classList[1])
//   // if (items[i].className){
//   //   console.log("existed?", items[i].className)
//   // } else {
//   //   const singlePrice = items[i].innerText;
//   //   partialSum = parseFloat(singlePrice.substring(0, singlePrice.length-3))
//   //   sum +=  partialSum;
//   //   console.log(`current sum2 is ${sum}`)
//   // }
//       // const singlePrice = items[i].innerText;
//       // partialSum = parseFloat(singlePrice.substring(0, singlePrice.length-3))
//       // sum +=  partialSum;
//       // console.log(`current sum2 is ${sum}`)
//     // }
//   }
//  console.log(`total is ${sum.toFixed(2)}`)
// }

// function grandTotal(id){
//   const items = document.querySelectorAll(`.cartId${id}`);
//   let sum = 0;
//   let partialSum = 0;
//   let hiddenCount = 0;
//   for (let i=-0;i<items.length;i++){
//     if (items[i].style.display === "none") {
//       //console.log("hidden")
//       hiddenCount++;
//       console.log(`hidden count is ${hiddenCount}`)
//       console.log(`hiddenID is ${id}`)
//       const singlePrice = document.querySelector(`.cartPriceId${id}`).innerText;
//       console.log(singlePrice)
//       console.log(singlePrice.substring(0, singlePrice.length-3))
//       console.log(parseFloat(singlePrice.substring(0, singlePrice.length-3)) * (hiddenCount + 1))

//       return;
//     }
//     for (let k=0;k<items[i].childNodes.length; k++){
//       if (items[i].childNodes[k].className == "cart-set-div"){
//         for (let j=0;j<items[i].childNodes[k].childNodes.length; j++){
//           if (items[i].childNodes[k].childNodes[j].className == "cart-price"){
//             console.log(items[i].childNodes[k].childNodes[j].innerText)
//           }
//         }
//       }
//     }
//   }
// }

let randomItemList = [];

function randomItems(num) {
  axios
    .get("https://fakestoreapi.com/products")
    .then((response) => {
      const data = response.data;
      console.log(data);
      for (let i = 0; i < num; i++) {
        const randomItem = data[Math.floor(Math.random() * data.length)];
        const cartIdDivs = document.querySelectorAll(".cart-id");

        console.log(randomItem.id, randomItem.category, randomItem.price);
        randomItemList.push({
          id: randomItem.id,
          category: randomItem.category,
          price: randomItem.price,
        });

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
        //showBreakdown(randomItem.title, randomItem.price, randomItem.id);
        grandTotal(randomItem.id);
      }
      //console.log(randomItemList)
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
      alert("Error retrieving information.");
    });
}

// //Try3 with Class
// class Chart {
//   constructor(url) {
//     this.url = url;
//   }

//   createChart() {
//     const myChart = echarts.init(document.getElementById("productsChart"));

//     fetch(this.url)
//       .then((response) => response.json()) // transforming to json text to javascript object  (i.e., json() method)
//       .then((products) => {
//         //================ With Array ================
//         let listOfProductPerCategory = [];
//         let count = {};
//         let typeArr = [];
//         let countArray = [];
//         let priceTotalPerCategory = {};
//         let averageArray = [];
//         // Extracting category name for each object so there are lots of duplicates
//         //console.log(products)

//         products.forEach((product) => {
//           // let key = product.category;
//           listOfProductPerCategory.push({ [product.category]: product.price });
//         });
//         //console.log(listOfProductPerCategory);

//         // Counting category names in listOfProductPerCategory then
//         // adding the category name as key and the count as value as an object
//         listOfProductPerCategory.forEach((element) => {
//           // console.log(Object.keys(element));
//           // console.log(parseFloat(Object.values(element)));

//           count[Object.keys(element)] = (count[Object.keys(element)] || 0) + 1;
//           priceTotalPerCategory[Object.keys(element)] =
//             (parseFloat(priceTotalPerCategory[Object.keys(element)]) || 0) +
//             parseFloat(Object.values(element));
//         });
//         // console.log(count);
//         // console.log(priceTotalPerCategory);

//         // separating keys and values as separate arrays to use Apache Echart's xAxis and yAxis
//         for (let x in count) {
//           typeArr.push(x);
//           //countArray.push(count[x]);
//         }

//         //get average per category
//         for (let x in priceTotalPerCategory) {
//           // console.log(priceTotalPerCategory[x])
//           // console.log(count[x])
//           averageArray.push((priceTotalPerCategory[x] / count[x]).toFixed(2));
//         }

//         //console.log(averageArray);
//         myChart.setOption({
//           //adding custom color for bars
//           color: ["#808080"],
//           xAxis: [
//             {
//               data: typeArr,
//               axisLabel: { rotate: 15, fontSize: 10 },
//             },
//             {
//               position: "bottom",
//               offset: 30,
//               axisLine: {
//                 show: false,
//               },
//               axisTick: {
//                 show: false,
//               },
//               data: averageArray.map((price) => `$${price}`),
//               axisLabel: { rotate: 15, fontSize: 10 },
//             },
//           ],
//           yAxis: {},
//           series: [
//             {
//               name: "Categories",
//               type: "bar",
//               data: averageArray,
//             },
//           ],
//         });
//       });
//   }
// }

// const myChart = new Chart("https://fakestoreapi.com/products");
// myChart.createChart();

//const fullData;
// const productList = [];

//console.log(`randomItemList is ${randomItemList.map(item=>item)}`)
//Try4 with Class With actual data
class Chart {
  constructor(url) {
    this.url = url;
    // this.list = list;
  }

  getCurrentItems() {
    const randomItemList = [
      { id: 1, category: "men's clothing", price: 10 },
      { id: 2, category: "women's clothing", price: 11 },
      { id: 3, category: "men's clothing", price: 13 },
      { id: 4, category: "kitchen", price: 13 },
    ];

    if (!document.querySelectorAll(".cart-item-div")) {
      console.log("No items");
    } else {
      const myChart = echarts.init(document.getElementById("productsChart"));
      //console.log("Here", this.list);

      let listOfProductPerCategory = [];
      let count = {};
      let typeArr = [];
      let countArray = [];
      let priceTotalPerCategory = {};
      let averageArray = [];
      //Extracting category name for each object so there are lots of duplicates
      //console.log("Im here1", this.list)

      randomItemList.forEach((product) => {
        // this.list.forEach((product) => {
        console.log("Im here");
        console.log("really", product.category);
        //// let key = product.category;
        listOfProductPerCategory.push({
          [product.category]: product.price,
        });
      });
      console.log(listOfProductPerCategory);

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

      console.log(averageArray);
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

      // fetch(this.url)
      //   .then((response) => response.json())
      //   .then((products) => {
      //     const productList = [];
      //     for (let i = 0; i < products.length; i++) {
      //       for (let k = 0; k < this.list.length; k++) {
      //         if (products[i].id == this.list[k]) {
      //           console.log("here");
      //           console.log("matching ID is ", products[i].id);
      //           //productList.push(products[i]);
      //         }
      //       }
      //     }

      //   });

      // let listOfProductPerCategory = [];
      // let count = {};
      // let typeArr = [];
      // let countArray = [];
      // let priceTotalPerCategory = {};
      // let averageArray = [];
      //Extracting category name for each object so there are lots of duplicates
      //console.log(products)

      // products.forEach((product) => {
      //   // let key = product.category;
      //   listOfProductPerCategory.push({
      //     [product.category]: product.price,
      //   });
      // });
      // //console.log(listOfProductPerCategory);

      // // Counting category names in listOfProductPerCategory then
      // // adding the category name as key and the count as value as an object
      // listOfProductPerCategory.forEach((element) => {
      //   // console.log(Object.keys(element));
      //   // console.log(parseFloat(Object.values(element)));

      //   count[Object.keys(element)] =
      //     (count[Object.keys(element)] || 0) + 1;
      //   priceTotalPerCategory[Object.keys(element)] =
      //     (parseFloat(priceTotalPerCategory[Object.keys(element)]) || 0) +
      //     parseFloat(Object.values(element));
      // });
      // // console.log(count);
      // // console.log(priceTotalPerCategory);

      // // separating keys and values as separate arrays to use Apache Echart's xAxis and yAxis
      // for (let x in count) {
      //   typeArr.push(x);
      //   //countArray.push(count[x]);
      // }

      // //get average per category
      // for (let x in priceTotalPerCategory) {
      //   // console.log(priceTotalPerCategory[x])
      //   // console.log(count[x])
      //   averageArray.push((priceTotalPerCategory[x] / count[x]).toFixed(2));
      // }

      // console.log(averageArray);
      // myChart.setOption({
      //   //adding custom color for bars
      //   color: ["#808080"],
      //   xAxis: [
      //     {
      //       data: typeArr,
      //       axisLabel: { rotate: 15, fontSize: 10 },
      //     },
      //     {
      //       position: "bottom",
      //       offset: 30,
      //       axisLine: {
      //         show: false,
      //       },
      //       axisTick: {
      //         show: false,
      //       },
      //       data: averageArray.map((price) => `$${price}`),
      //       axisLabel: { rotate: 15, fontSize: 10 },
      //     },
      //   ],
      //   yAxis: {},
      //   series: [
      //     {
      //       name: "Categories",
      //       type: "bar",
      //       data: averageArray,
      //     },
      //   ],
      // });
      // });
    }
  }

  // createChart() {
  //   const myChart = echarts.init(document.getElementById("productsChart"));

  //   fetch(this.url)
  //     .then((response) => response.json()) // transforming to json text to javascript object  (i.e., json() method)
  //     .then((products) => {
  //       //================ With Array ================
  //       let listOfProductPerCategory = [];
  //       let count = {};
  //       let typeArr = [];
  //       let countArray = [];
  //       let priceTotalPerCategory = {};
  //       let averageArray = [];
  //       // Extracting category name for each object so there are lots of duplicates
  //       //console.log(products)

  //       products.forEach((product) => {
  //         // let key = product.category;
  //         listOfProductPerCategory.push({ [product.category]: product.price });
  //       });
  //       //console.log(listOfProductPerCategory);

  //       // Counting category names in listOfProductPerCategory then
  //       // adding the category name as key and the count as value as an object
  //       listOfProductPerCategory.forEach((element) => {
  //         // console.log(Object.keys(element));
  //         // console.log(parseFloat(Object.values(element)));

  //         count[Object.keys(element)] = (count[Object.keys(element)] || 0) + 1;
  //         priceTotalPerCategory[Object.keys(element)] =
  //           (parseFloat(priceTotalPerCategory[Object.keys(element)]) || 0) +
  //           parseFloat(Object.values(element));
  //       });
  //       // console.log(count);
  //       // console.log(priceTotalPerCategory);

  //       // separating keys and values as separate arrays to use Apache Echart's xAxis and yAxis
  //       for (let x in count) {
  //         typeArr.push(x);
  //         //countArray.push(count[x]);
  //       }

  //       //get average per category
  //       for (let x in priceTotalPerCategory) {
  //         // console.log(priceTotalPerCategory[x])
  //         // console.log(count[x])
  //         averageArray.push((priceTotalPerCategory[x] / count[x]).toFixed(2));
  //       }

  //       //console.log(averageArray);
  //       myChart.setOption({
  //         //adding custom color for bars
  //         color: ["#808080"],
  //         xAxis: [
  //           {
  //             data: typeArr,
  //             axisLabel: { rotate: 15, fontSize: 10 },
  //           },
  //           {
  //             position: "bottom",
  //             offset: 30,
  //             axisLine: {
  //               show: false,
  //             },
  //             axisTick: {
  //               show: false,
  //             },
  //             data: averageArray.map((price) => `$${price}`),
  //             axisLabel: { rotate: 15, fontSize: 10 },
  //           },
  //         ],
  //         yAxis: {},
  //         series: [
  //           {
  //             name: "Categories",
  //             type: "bar",
  //             data: averageArray,
  //           },
  //         ],
  //       });
  //     });
  // }
}

// const myChart = new Chart("https://fakestoreapi.com/products", randomItemList);
const myChart = new Chart("https://fakestoreapi.com/products");

// myChart.createChart();
myChart.getCurrentItems();
