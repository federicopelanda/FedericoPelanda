function login(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if(email === "" || password === ""){
        alert("Completa ambos campos.");
    }else{
        location.href = "/index.html";
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('ingresar').addEventListener('click', () =>{
      login();
    })
})