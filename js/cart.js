let cartArray = [];

document.addEventListener("DOMContentLoaded", function (resultObj) {
    getJSONData(CART_INFO_URL + 25801 + ".json").then(function (resultObj) {
      if (resultObj.status === "ok") {
        cartArray = resultObj.data;
        addToCart();
      }
    });
  });

function showCart(array) {

  for (let i = 0; i < array.articles.length; i++) {
    let product = array.articles[i];

    document.getElementById("cart-container").innerHTML +=
      `<td scope="row"><img src="`+product.image+`" style="max-width:100px; min-width:100px;"></td>
      <td scope="row">`+product.name+`</td>
      <td scope="row">`+product.currency+` `+product.unitCost+`</td>
      <td scope="row"><input type="number" id="cant" value="`+product.count+`" min="1" class="col-2"></td>
      <td id="total" scope="row">`+product.currency+` `+product.count * product.unitCost+`</td>`;

      document.getElementById("cant").addEventListener("change", () => {
        document.getElementById("total").innerHTML = `
        `+product.currency+`  `+document.getElementById("cant").value * product.unitCost+` 
        `;
      
    });
  }
};

function addToCart(){
  let comentA = [];
  comentA.image = localStorage.getItem('img');
  comentA.name = localStorage.getItem('name');
  comentA.currency = localStorage.getItem('currency');
  comentA.unitCost =  localStorage.getItem('cost');
  comentA.count = localStorage.getItem('count');
 
  cartArray.articles.push(comentA);
  showCart(cartArray);
}

function inputsEnvio(){
    let permium = document.getElementById("permium").checked;
    let express = document.getElementById("express").checked;
    let standard = document.getElementById("standard").checked;
}