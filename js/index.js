document.addEventListener('DOMContentLoaded',()=>{

    let usuario = JSON.parse(localStorage.getItem('user'));

    if(usuario == null){
        alert("Es necesario iniciar sesión.");
        location.href= "login.html"
        
    } else {
        document.getElementById('usuario');
    }
}
)

function logOut(){
    localStorage.clear();
    window.location= "login.html"
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
}

document.getElementById('logOut').addEventListener('click', ()=>{
    logOut();
})

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});