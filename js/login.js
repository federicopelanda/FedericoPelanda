function login(){
    email = document.getElementById('email');
    password = document.getElementById('password');

    if(email.value === ""){
        email.classList.add('is-invalid'); 
    }if(password.value === ""){
        password.classList.add('is-invalid');
    }if(email.value !== "" && password.value !== ""){
        localStorage.setItem('item',JSON.stringify(email));
        location.href = "/index.html"
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('ingresar').addEventListener('click', () =>{
      login();
    })
})