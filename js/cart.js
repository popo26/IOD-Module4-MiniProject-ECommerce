
let myChart = echarts.init(document.getElementById('productsChart'));

    fetch("https://fakestoreapi.com/products")
    .then(response => response.json()) // transforming to json text to javascript object  (i.e., json() method)
    .then(products => {
        console.log(products);

        //  ================ With Map ================
        // let nbProductsPerCategory = new Map();
        // products.forEach(product => {
        //     //if the map doesnt contain the product category yet
        //     if (nbProductsPerCategory.has(product.category) === false){
        //         nbProductsPerCategory.set(product.category, 1);
        //     } else {
        //         nbProductsPerCategory.set(product.category, nbProductsPerCategory.get(product.category) + 1);
        //     }
        // });

        //================ Original Array ================
            // let listOfAllCategories = [];
            // products.forEach((product) => {
            //   if (listOfAllCategories.includes(product.category) === false) {
            //     listOfAllCategories.push(product.category);
            //   }
            // });

   

        //================ With Array ================
            let listOfProductPerCategory = [];
            let count = {};
            let typeArr = [];
            let countArray = [];
            products.forEach(product => {
                listOfProductPerCategory.push(product.category)     
            });
            listOfProductPerCategory.forEach(element => {
                    count[element] = (count[element] || 0) + 1;
            });
        for (let x in count){
            typeArr.push(x)
            countArray.push(count[x])
        };
           

        myChart.setOption({
            // title: {
            //     text: 'Cart Breakdown'
            // },
            // tooltip: {},
            // legend: {
            //     data: ['Categories']
            // },
            xAxis: {
                // data: Array.from(nbProductsPerCategory.keys()), /================ /With Map ================
                data:typeArr, // ================ With Array ================
                //data: listOfAllCategories, // ================ With original array ================
            },
            yAxis: {},
            series: [
                {
                name: 'Categories',
                type: 'bar',
                // data: Array.from(nbProductsPerCategory.values()), // ================ With Map ================
                data: countArray, // ================ With Array ================
                //data:[2,4,1,3], // ================ With original array ================
                },
            ],
            });
        });

        document.querySelector(".year").innerHTML = dayjs().year();



