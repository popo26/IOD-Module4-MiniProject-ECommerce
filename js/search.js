let resultArray = [];

function resultShow(title, price, image) {
    // clone the template
    const template =
        document.getElementById("result-template").content.cloneNode(true);
    // populate the template
    template.querySelector('.result-image').src = image;
    template.querySelector('.result-image').alt = title;

    template.querySelector('.result-title').innerText = title;
    template.querySelector('.result-price').innerText = price + " NZD";
    // include the populated template into the page
    document.querySelector('#search-results').appendChild(template);
}



document.querySelector(".search-submit").addEventListener("click", function (event) {
    event.preventDefault();
  
    if (document.querySelector('.result-div')){
        while (document.querySelector('#search-results').firstChild) {
            document.querySelector('#search-results').firstChild.remove();
        };

   
        // const divs = document.querySelectorAll('.result-div');
        // console.log(divs)
        
        // divs.forEach(div => {
        //     div = document.querySelector('.result-div');
        //     while (div.firstChild) {
        //         div.removeChild(div.firstChild);
        //     }
        // })
       

    }


    let search = document.querySelector(".search-input").value ;
    let searchKeyword = search.toLowerCase() || null;

    axios.get('https://fakestoreapi.com/products')
        .then(response => {
            const data = response.data;
            for (let x in data) {
                if (data[x].title.toLowerCase().includes(searchKeyword)) {
                    resultArray.push(data[x]);
                }
            }
            // console.log(resultArray)
            resultArray.forEach((item) => {
                resultShow(item.title, item.price, item.image)
              
            });
            document.querySelector('.search-input').value = "";
        })
});




