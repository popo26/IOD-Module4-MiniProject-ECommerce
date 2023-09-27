let homeImage = "";

document.querySelector(".year").innerHTML = dayjs().year();

function homeImagesShow(image, title) {
    // clone the template
    const template =
        document.getElementById("homeImages-template").content.cloneNode(true);
    // populate the template
    template.querySelector('.homeImage').src = image;
    template.querySelector('.homeImage').alt = title;
    // include the populated template into the page
    document.querySelector('#homeImages-show').appendChild(template);
}

function addCard(title, price, image, id) {
    // clone the template
    const template = document.getElementById("card-template").content.cloneNode(true);
    // populate the template
    template.querySelector('.card-image').src = image;
    template.querySelector('.card-image').alt = title;
    template.querySelector('.card-title').title = id;
    template.querySelector('.card-id').innerText = id;
    // template.querySelector('.card-id').onclick="submitId()";
    template.querySelector('.card-link').classList.add(`id${id}`)
    template.querySelector(`.id${id}`).addEventListener("click", function(e) {
        let inputId = id; 
        console.log(inputId)
        localStorage.setItem('myId', inputId);
        window.location.href = '/pages/item.html';
    });
    template.querySelector('.card-title').innerText = title;
    template.querySelector('.card-price').innerText = price + " NZD";
    // include the populated template into the page
    document.querySelector('#card-list').appendChild(template);
    }

function showItem(title, price, image, id) {
    // clone the template
    const template = document.getElementById("item-show-template").content.cloneNode(true);
    // populate the template
    template.querySelector('.item-image').src = image;
    template.querySelector('.item-image').alt = title;
    template.querySelector('.item-title').title = id;
    template.querySelector('.item-title').innerText = title;
    template.querySelector('.item-price').innerText = price;
    // include the populated template into the page
    document.querySelector('#item-show').appendChild(template);
    }
        
    axios.get('https://fakestoreapi.com/products')
    .then(response => {
        const data = response.data;
        homeImage = data[Math.floor(Math.random() * data.length)];
        homeImagesShow(homeImage.image, homeImage.title);
    });

function submitId() {
    // Get the value entered by the user
    let inputIds = document.querySelectorAll('.card-id').innerHTML;    
    let inputId;
    for(var i = 0; i < inputIds.length; i++){
        (function (index) {
            var tab = inputIds[index];
            var content = tab.querySelector(".card-id").innerText;
            tab.onclick = function(){
                let inputId = document.querySelector('.card-id').innerHTML;     
            } 
        });
        localStorage.setItem('myId', inputId);
        window.location.href = '/pages/item.html';
      }
}

const categoryArray = ['.women', '.men', '.jewelery', '.electronics']

for (let key in categoryArray) {
   console.log(categoryArray[key]);
   document.querySelector(categoryArray[key]).addEventListener("click", function (event) {
    event.preventDefault();

    if (document.querySelector('.card-div')){
        while (document.querySelector('#card-list').firstChild) {
            document.querySelector('#card-list').firstChild.remove();
        };
    }
    document.querySelector('#homeImages-show').style.display = 'none';
    ((categoryArray[key] === ".women")? axios.get('https://fakestoreapi.com/products/category/women\'s%20clothing'):
    (categoryArray[key] === ".men")?axios.get(`https://fakestoreapi.com/products/category/men\'s%20clothing`):
    axios.get(`https://fakestoreapi.com/products/category/${categoryArray[key].substring(1)}`)
    )
    .then(response => {
    const data = response.data;
    console.log(response.data);
    data.forEach((item) => {
        addCard(item.title, item.price, item.image, item.id);
    });
    });
    });
};

