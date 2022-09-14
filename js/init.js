const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener('DOMContentLoaded',()=>{

  let usuario = localStorage.getItem('user');

  if(usuario == null){
      alert("Es necesario iniciar sesión.");
      location.href = "login.html"
  } else {
      document.getElementById('usuario');
  }
}
)

function logOut(){
  localStorage.clear();
  window.location = "login.html"
}

document.getElementById('logOut').addEventListener('click', ()=>{
  logOut();
})

function usuario(){
  let user = JSON.parse(localStorage.getItem('users'))

  document.getElementById('users').innerHTML += user.nombre
}

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  /*console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());*/
  // The ID token you need to pass to your backend:

  let users = {};
  
  users.id = profile.getId()
  users.nombre = profile.getName()
  users.img = profile.getImageUrl()  
  users.mail = profile.getEmail()
  users.name = profile.getGivenName()
  users.surname = profile.getFamilyName()

  var id_token = googleUser.getAuthResponse().id_token; 
  console.log("ID Token: " + id_token);

  location.href ='index.html';

  localStorage.setItem('user', JSON.stringify(users));
  sessionStorage.setItem('user', JSON.stringify(users));
  
}

function signOut(){
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function(){

  });
}

function onLoad(){
  gapi.load('auth2' , function(){
      gapi.auth2.init();
  })
}