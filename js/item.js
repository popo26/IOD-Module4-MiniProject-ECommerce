// if (window.location.pathname.includes('#redirect'))
// alert("Hi");


window.onload = function() {
    // Get the value from localStorage
    // var value = localStorage.getItem('myValue');
    var value = localStorage.getItem('myId');
    // Display the value on the page
    // var output = document.getElementById('value-output');
    // output.innerText = value;
    // alert(value)
  };

  console.log(localStorage.getItem('myId'))

  let myId = localStorage.getItem('myId');

  axios.get(`https://fakestoreapi.com/products/${myId}`)
    .then(response => {
        console.log(response.data);
        const data = response.data;
        document.querySelector('.item-image').src = data.image;
        document.querySelector('.item-image').alt = data.title;

        document.querySelector('.item-price').innerHTML = `${data.price} NZD`;
        
        document.querySelector('.item-title').innerHTML = data.title;
        document.querySelector('.item-description').innerHTML = data.description;
        document.querySelector('.item-rating').innerHTML = data.rating.rate;

        
    })

    document.querySelector(".year").innerHTML = dayjs().year();


// window.onload = function () {
//     alert("Hello World!");
// }

// function showItem(title, price, image, id) {
//     // clone the template
//     const template = document.getElementById("item-show-template").content.cloneNode(true);
//     // populate the template
//     template.querySelector('.item-image').src = image;
//     template.querySelector('.item-image').alt = title;
//     template.querySelector('.item-title').title = id;

//     template.querySelector('.item-title').innerText = title;
//     template.querySelector('.item-price').innerText = price;

//     //template.querySelector('.card-text').innerText = 'lorem ipsum ble bla';
//     // include the populated template into the page
//     document.querySelector('#item-show').appendChild(template);
//     }
    
// showItem("Test", "20", "", 1);


// axios.get(`https://fakestoreapi.com/products/${id}`)
//     .then(response => {
//         console.log(response.data);
//         const data = response.data;
//         console.log(data)
//         console.log("Hi")
//         showItem(data.title, item.price, item.image, item.id);
//         console.log("HHere")

        // data.filter((item) => {
        //     if (item.id === id){
        //         console.log("Hi")
        //         showItem(item.title, item.price, item.image, item.id);
        //         console.log("HHere")

        //     }
        // })
        
    // })




