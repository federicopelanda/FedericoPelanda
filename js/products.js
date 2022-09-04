let productsArray = [];
let currentSortCriteria = undefined;
let minimo = undefined;
let maximo = undefined;
let idCategories = localStorage.getItem("catID");
let buscado = []

function showProductsList(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    htmlContentToAppend +=
      `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      product.image +
      `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +
      product.name +
      ` - ` +
      product.currency +
      ` ` +
      product.cost +
      `</h4> 
                        <p> ` +
      product.description +
      `</p> 
                        </div>
                        <small class="text-muted">` +
      product.soldCount +
      ` vendidos</small> 
                    </div>
 
                </div>
            </div>
        </div>
        `;
  }
  document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (resultObj) {
  getJSONData(PRODUCTS_URL + idCategories + ".json").then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data.products;
      showProductsList(productsArray);
      document.getElementById("catNombre").innerHTML = "Verás aquí los productos de la categoría " + resultObj.data.catName;
    }
  });
});

let catNombre = productsArray

//Filtro por valores de precio mínimo y máximo
function filtrar() {
  let minimo = parseInt(document.getElementById("precioMin").value); //tomo el valor mínimo
  let maximo = parseInt(document.getElementById("precioMax").value); //tomo el valor máximo
  let listaFiltrada = productsArray.filter(
    (producto) => producto.cost >= minimo && producto.cost <= maximo
  );
  // arr.sort((a,b)=>a-b)
  listaFiltrada.sort((a, b) => a.cost - b.cost);

  showProductsList(listaFiltrada);
}

//Filtro por precio descendiente
function filtroDesc() {
  let min = 0;
  let max = 100000000000000000000000000000000000000000n;
  let listaDesc = productsArray.filter(
    (producto) => producto.cost >= min && producto.cost <= max
  );
  // arr.sort((a,b)=>a-b)
  listaDesc.sort((a, b) => b.cost - a.cost);

  showProductsList(listaDesc);
}

//Filtro por precio ascendiente
function filtroAsc() {
  let min = 0;
  let max = 100000000000000000000000000000000000000000n;
  let listaAsc = productsArray.filter(
    (producto) => producto.cost >= min && producto.cost <= max
  );
  // arr.sort((a,b)=>a-b)
  listaAsc.sort((a, b) => a.cost - b.cost);

  showProductsList(listaAsc);
}

//Filtro por relevancia
function filtroRel() {
  let min = 0;
  let max = 100000000000000000000000000000000000000000n;
  let listaRel = productsArray.filter(
    (producto) => producto.soldCount >= min && producto.soldCount <= max
  );
  // arr.sort((a,b)=>a-b)
  listaRel.sort((a, b) => b.soldCount - a.soldCount);

  showProductsList(listaRel);
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botonFiltrar").addEventListener("click", () => {
  filtrar();
  });
});

document.getElementById("botonLimpiar").addEventListener("click", function () {
  document.getElementById("precioMin").value = "";
  document.getElementById("precioMax").value = "";

  minimo = undefined;
  maximo = undefined;
  document.getElementById('buscador').value = ""

  showProductsList(productsArray);
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filtroDesc").addEventListener("click", () => {
    filtroDesc();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filtroAsc").addEventListener("click", () => {
    filtroAsc();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filtroRel").addEventListener("click", () => {
    filtroRel();
  });
});

//Buscador
function buscar(){
    let elemento = document.getElementById('buscador').value;
    let buscado = productsArray.filter( producto =>{
        return producto.name.toLowerCase().indexOf(elemento.toLowerCase()) > -1;
    });
    showProductsList(buscado)
}

document.getElementById('buscador').addEventListener('keyup',()=>{
    buscar();
});
