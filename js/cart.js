let myChart = echarts.init(document.getElementById("productsChart"));

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json()) // transforming to json text to javascript object  (i.e., json() method)
  .then((products) => {
    //================ With Array ================
    let listOfProductPerCategory = [];
    let count = {};
    let typeArr = [];
    let countArray = [];
    // Extracting category name for each object so there are lots of duplicates
    products.forEach((product) => {
      listOfProductPerCategory.push(product.category);
    });

    // Counting category names in listOfProductPerCategory then
    // adding the category name as key and the count as value as an object
    listOfProductPerCategory.forEach((element) => {
      count[element] = (count[element] || 0) + 1;
    });

    // separating keys and values as separate arrays to use Apache Echart's xAxis and yAxis
    for (let x in count) {
      typeArr.push(x);
      countArray.push(count[x]);
    }

    myChart.setOption({
      //adding custom color for bars
      color: ["#808080"],

      xAxis: {
        data: typeArr,
      },
      yAxis: {},
      series: [
        {
          name: "Categories",
          type: "bar",
          data: countArray,
        },
      ],
    });
  });

// Days.js for footer
document.querySelector(".year").innerHTML = dayjs().year();
