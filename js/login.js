function login(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    if(email.value === "" || password.value === ""){
        email.classList.add('is-invalid');
        password.classList.add('is-invalid');
    }else{
        location.href = "/index.html";
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('ingresar').addEventListener('click', () =>{
      login();
    })
})