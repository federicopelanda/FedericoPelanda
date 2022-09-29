let productInfoArray = []
let productInfoComArray = []
let idProduct = localStorage.getItem("prodID");

function showProductsList(array) {
  let htmlContentToAppend = "";

  htmlContentToAppend += `
  <br><br>
  <h1 class="mb-3">`+ array.name +`</h1><br>
  <hr class="mb-4">
  <h4 style="font-weight: bold;">Precio</h4>
  <h5 class="">`+ array.currency +` `+ array.cost +`</h5><br>
  <h4 style="font-weight: bold;">Descripción</h4>
  <h5 class="">`+ array.description +`</h5><br>
  <h4 style="font-weight: bold;">Categoría</h4>
  <h5>`+ array.category +`</h5><br>
  <h4 style="font-weight: bold;">Cantidad de vendidos</h4>
  <h5 class="">`+ array.soldCount +`</h5><br>
  <h4 style="font-weight: bold;">Imágenes ilustrativas</h4><br>
  <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="`+ array.images[0] +`" class="d-block w-100" alt="`+ array.images[0] +`">
    </div>
    `+ showImgList(array) +`
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
  
  document.getElementById("prod-info-list-container").innerHTML = htmlContentToAppend;
}

function showImgList(array) {
  let htmlImages = "";
  for(let i = 0; i < array.images.length-1; i++){
    let img = array.images[i+1];

  htmlImages += `
    <div class="carousel-item">
      <img src="`+ img +`" class="d-block w-100" alt="`+ img +`">
    </div>
  `;
  }
  return htmlImages;
}

function mostrarEstrellas(score){
  let estrella = "";

  for(let i=1; i<=5; i++){
      if(i <= score){
          estrella += `<i class="fas fa-star checked"></i></span>`
      } else {
          estrella += `<i class="fas fa-star"></i></span>`
      }
  }

  return estrella;
}

function showCommentsList(array) {
  let htmlContentToAppend = "";
  for(let i = 0; i < array.length; i++){
    let com = array[i];

  htmlContentToAppend += `
  <div class="list-group-item">
  <p><b>` + com.user +` - </b>` + com.dateTime + ` -  `+ mostrarEstrellas(parseInt(com.score)) +`</p>
  <p>` + com.description +`</p> 
  </div>
  `;

  document.getElementById("prod-info-com-list-container").innerHTML = htmlContentToAppend;
  }
}

function muestraReloj() {
  var fechaHora = new Date();
  var dia =  fechaHora.getDate();
  var mes = fechaHora.getMonth();
  var año = fechaHora.getFullYear();
  var horas = fechaHora.getHours();
  var minutos = fechaHora.getMinutes();
  var segundos = fechaHora.getSeconds();

  if(dia < 10) { dia = '0' + dia; }
  if(mes < 10) { mes = '0' + mes; }
  if(horas < 10) { horas = '0' + horas; }
  if(minutos < 10) { minutos = '0' + minutos; }
  if(segundos < 10) { segundos = '0' + segundos; }

  document.getElementById("reloj").innerHTML = año + "-" + mes + "-" + dia + " " + horas+':'+minutos+':'+segundos;
}

function addCom(){
  let comentA = [];
  comentA.score = document.getElementById('valor').innerHTML;
  comentA.user = localStorage.getItem('user');
  comentA.description = document.getElementById('textoCom').value;
  comentA.dateTime =  undefined;
  if(comentA.score != 0){
    muestraReloj()
    comentA.dateTime = document.getElementById("reloj").innerHTML
    productInfoComArray.push(comentA);
    showCommentsList(productInfoComArray);
    document.getElementById("textoCom").value= "";
    document.getElementById("reloj").value = "";
    document.getElementById("valor").value = 0;
  } else {
    alert("Debe calificar una o más estrellas.");
  }
}

function showRelProd(array) {
  let htmlRelProd = "";
  for(let i = 0; i < array.relatedProducts.length; i++){
    let prod = array.relatedProducts[i];

  htmlRelProd += `
  <td class="col-md-4">
  <div class="card mb-4 custom-card cursor-active" id="`+ prod.id +`" onclick="setProdID(${prod.id})">
    <img class="card-img-top" src="`+ prod.image +`"
      alt="Imgagen representativa de la categoría 'Juguetes'">
    <h3 class="m-3">`+ prod.name +`</h3>
  </div>
</td>
  `;
  }
  document.getElementById("rel-prod").innerHTML += htmlRelProd;
}


document.addEventListener("DOMContentLoaded", function (resultObj) {
  getJSONData(PRODUCT_INFO_URL + idProduct + ".json").then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfoArray = resultObj.data;
      showProductsList(productInfoArray);
      showRelProd(productInfoArray);
    }
  });
});

document.addEventListener("DOMContentLoaded", function (resultCom) {
  getJSONData(PRODUCT_INFO_COMMENTS_URL + idProduct + ".json").then(function (resultCom) {
    if (resultCom.status === "ok") {
      productInfoComArray = resultCom.data;
      showCommentsList(productInfoComArray);
    }
  });
});

document.getElementById('enviarCom').addEventListener('click', () => {
  addCom();
});

function setProdID(id) {
  localStorage.setItem("prodID", id)
    window.location = "product-info.html"
}
