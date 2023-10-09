// template to display results of search in nav bar
function resultShow(title, price, image, id) {
  // clone the template
  const template = document
    .getElementById("result-template")
    .content.cloneNode(true);
  // populate the template
  template.querySelector(".result-image").src = image;
  template.querySelector(".result-image").alt = title;
  // adding id for debug purpose
  template.querySelector(".result-id").innerText = id;
  // adding click event to identify each item to pass to item.html.
  template.querySelector(".result-link").classList.add(`resultId${id}`);
  template
    .querySelector(`.resultId${id}`)
    .addEventListener("click", function (e) {
      let inputId = id;
      localStorage.setItem("myId", inputId);
      window.location.href = "./pages/item.html";
    });
  template.querySelector(".result-title").innerText = title;
  template.querySelector(".result-price").innerText = price + " NZD";

  // adding click event to track cliking count of Add button.
  // As the count required to be persistent during session, sessionStorage is used.
  template.querySelector(".result-add-btn").addEventListener("click", function (e) {
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
  
  
  // include the populated template into the page
  document.querySelector("#search-results").appendChild(template);
}

document
  .querySelector(".search-submit")
  .addEventListener("click", function (event) {
    event.preventDefault();
    // Delete existing searched that are being displayed.
    if (document.querySelector(".result-div")) {
      while (document.querySelector("#search-results").firstChild) {
        document.querySelector("#search-results").firstChild.remove();
      }
    }

    let search = document.querySelector(".search-input").value;
    let searchKeyword = search.toLowerCase() || null;

    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const data = response.data;
        let resultArray = [];
        for (let x in data) {
          if (data[x].title.toLowerCase().includes(searchKeyword)) {
            resultArray.push(data[x]);
          }
        }
        // console.log(`resultArray length ${resultArray.length}`);
        if (resultArray.length === 0) {
          const message = "No result found.";
          document.querySelector("#search-results").innerHTML = message;
        } else {
          document.querySelector("#search-results").innerHTML = "";
        }
        resultArray.forEach((item) => {
          resultShow(item.title, item.price, item.image, item.id);
        });
        document.querySelector(".search-input").value = "";
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        alert("Error retrieving information.");
      });
  });
