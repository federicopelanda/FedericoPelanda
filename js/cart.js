let cartArray = [];
let calle = document.getElementById('calle');
let esquina = document.getElementById('esquina');
let numero = document.getElementById('numero');
let tarjetaCredito = document.getElementById('tarjetaCredito');
let transBanc = document.getElementById('transBanc');
let nroTarjeta = document.getElementById('nroTarjeta');
let codigoSeg = document.getElementById('codigoSeg');
let vencimiento = document.getElementById('vencimiento');
let nroCuenta = document.getElementById('nroCuenta');
let textFormPago = document.getElementById('textFormPago');
let borro = document.getElementsByName('borrar');


document.addEventListener("DOMContentLoaded", function (resultObj) {
    getJSONData(CART_INFO_URL + 25801 + ".json").then(function (resultObj) {
      if (resultObj.status === "ok") {
        cartArray = resultObj.data;
        addToCart();
        sumarSubtotal();
      }
    });
  });

  function showCart(array) {
    document.getElementById("cart-container").innerHTML =""


    for (let i = 0; i < array.articles.length; i++) {
      let product = array.articles[i];
  
      document.getElementById("cart-container").innerHTML +=
        `<td scope="row"><img src="${product.image}" style="max-width:100px; min-width:100px;"></td>
        <td scope="row">${product.name}</td>
        <td scope="row"><div class="moneda" style="display: inline">${product.currency}</div> <div style="display: inline" class="precio">${product.unitCost}</div></td>
        <td scope="row"><input type="number" id="cant" onchange='sumarSubtotal()' value="1" min="1" class="col-2"></td>
        <td id="total" scope="row" ><div class="moneda2" style="display: inline">${product.currency}</div> <div class="subtotales" style="display: inline">${product.unitCost}</div></td>
        <td><button name="borrar" width=30 class="btn btn-danger">Borrar</button></td>`;


      };
      for (let i=0; i< borro.length; i++){
        borro[i].addEventListener('click',()=>{
            eliminar(i);
            sumarSubtotal();
        })

       
    }
  };

  function eliminar(posicion){
  cartArray.articles.splice(posicion,1);
  showCart(cartArray);
}


function sumarSubtotal(){
 
  let precios = document.getElementsByClassName('precio');
  let cantidades = document.getElementsByTagName ('input');
  let subtotales = document.getElementsByClassName('subtotales');
  let moneda = document.getElementsByClassName('moneda');
  let moneda2 = document.getElementsByClassName('moneda2');
  let total=0;
  let subtotal=0;
  let currency =""
  let envio = document.getElementsByName('tipoenvio');
  for (let i=0; i< precios.length; i++){
    if(moneda2[i].innerHTML=="UYU"){

      moneda[i].innerHTML="USD"
      moneda2[i].innerHTML="USD"
      precios[i].innerHTML = (parseFloat(precios[i].innerHTML / 41).toFixed(2))
      subtotales[i].innerHTML = (parseFloat(precios[i].innerHTML / 41).toFixed(2))
      }
      total+= parseFloat(precios[i].innerHTML);
      subtotal+= parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
      currency+=
      subtotales [i].innerHTML=parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
    }

    for (let i=0; i< precios.length; i++){
      
    }


    costoEnvio =0;
    for (let x=0; x< envio.length; x++){
        if (envio[x].checked){
            costoEnvio = subtotal * parseFloat(envio[x].value);

        }
    } 
    document.getElementById('costoTotal').innerHTML=(parseFloat((subtotal).toFixed(0)) + parseFloat((costoEnvio).toFixed(0)));
    document.getElementById('costoEnvio').innerText= (costoEnvio).toFixed(0);
    document.getElementById('costoSubtotal').innerHTML=`${(subtotal).toFixed(0)}`

}


function addToCart(){
  let cartA = [];
  cartA.image = localStorage.getItem('img');
  cartA.name = localStorage.getItem('name');
  cartA.currency = localStorage.getItem('currency');
  cartA.unitCost =  localStorage.getItem('cost');
  cartA.count = localStorage.getItem('count');
 
  cartArray.articles.push(cartA);
  showCart(cartArray);
}



function finCompraIsInvalid(){
  if(calle.value === ""){
    calle.classList.add('is-invalid'); 
  }if(numero.value === ""){
    numero.classList.add('is-invalid');
  }if(esquina.value === ""){
    esquina.classList.add('is-invalid');
  }if(tarjetaCredito.checked == true && nroTarjeta.value == ""){
    nroTarjeta.classList.add("is-invalid");
  }if(tarjetaCredito.checked == true && codigoSeg.value == ""){
    codigoSeg.classList.add("is-invalid");
  }if(tarjetaCredito.checked == true && vencimiento.value == ""){
    vencimiento.classList.add("is-invalid");
  }if(transBanc.checked == true && nroCuenta.value == ""){
    nroCuenta.classList.add("is-invalid");
  }
};

function formaPago(){

  if(tarjetaCredito.checked == true){
    nroCuenta.setAttribute("disabled", true);
    textFormPago.innerHTML = "Tatjeta de credito "
    nroTarjeta.removeAttribute("disabled", true);
    codigoSeg.removeAttribute("disabled", true);
    vencimiento.removeAttribute("disabled", true);
    textFormPago.classList.remove("is-invalid");
    nroCuenta.value = "";
  } if(transBanc.checked == true){
    nroTarjeta.setAttribute("disabled", true);
    codigoSeg.setAttribute("disabled", true);
    vencimiento.setAttribute("disabled", true);
    nroCuenta.removeAttribute("disabled", true);
    textFormPago.innerHTML = "Transacción bancaria "
    textFormPago.classList.remove("is-invalid");
    nroTarjeta.value = "";
    codigoSeg.value = "";
    vencimiento.value = "";
  } if(tarjetaCredito.checked == false && transBanc.checked == false){
    textFormPago.classList.add("is-invalid");
  }
}

function showAlertSuccess() {
  alerta.classList.add("show");
}

function finalizarCompra(){
  if(calle.value !== "" && numero.value !== "" && esquina.value !== ""){
    if(tarjetaCredito.checked == true && nroTarjeta.value !== "" && codigoSeg.value !== "" && vencimiento.value !== ""){
    showAlertSuccess();
    }if(transBanc.checked == true && nroCuenta.value !== ""){
    showAlertSuccess();
    };
  };
};

calle.addEventListener('keydown', () => {
  calle.classList.remove("is-invalid")
});

numero.addEventListener('keydown', () => {
  numero.classList.remove("is-invalid")
});

esquina.addEventListener('keydown', () => {
  esquina.classList.remove("is-invalid")
});

tarjetaCredito.addEventListener('change', () => {
  formaPago();
  nroCuenta.classList.remove("is-invalid")
});

transBanc.addEventListener('change', () => {
  formaPago();
  nroTarjeta.classList.remove("is-invalid")
  codigoSeg.classList.remove("is-invalid")
  vencimiento.classList.remove("is-invalid")
});

nroTarjeta.addEventListener('keydown', () => {
  nroTarjeta.classList.remove("is-invalid")
});

codigoSeg.addEventListener('keydown', () => {
  codigoSeg.classList.remove("is-invalid")
});

vencimiento.addEventListener('keydown', () => {
  vencimiento.classList.remove("is-invalid")
});

nroCuenta.addEventListener('keydown', () => {
  nroCuenta.classList.remove("is-invalid")
});

tarjetaCredito.addEventListener('keydown', () => {
  nroCuenta.classList.remove("is-invalid")
});

document.getElementById("finCompra").addEventListener("click", () => {
  finCompraIsInvalid()
  finalizarCompra()
  formaPago()
});

let alerta = document.getElementById("alert-success");