document.addEventListener('DOMContentLoaded',()=>{

    let usuario = JSON.parse(localStorage.getItem('user'));

    if(usuario == null){
        alert("Es necesario iniciar sesión.");
        location.href = "/js/login.html"
    } else {
        document.getElementById('usuario');
    }
}
)

function logOut(){
    localStorage.clear();
    location.href= "/login.html"
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