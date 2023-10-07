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

//Try2
let myChart = echarts.init(document.getElementById("productsChart"));

fetch("https://fakestoreapi.com/products")
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
    console.log(count);
    console.log(priceTotalPerCategory);

    // separating keys and values as separate arrays to use Apache Echart's xAxis and yAxis
    for (let x in count) {
      typeArr.push(x);
      countArray.push(count[x]);
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

      // xAxis: {
      //   data: typeArr,
      //   axisLabel: {
      //     rotate: 45,
      //     fontSize: 10,
      //   },
      // },
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

// Days.js for footer
document.querySelector(".year").innerHTML = dayjs().year();
