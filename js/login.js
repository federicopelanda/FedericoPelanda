function login(){
    email = document.getElementById('email');
    password = document.getElementById('password');

    if(email.value !== "" && password.value !== ""){
        localStorage.setItem('user',JSON.stringify(email.value));
        location.href = "/index.html"
    } else if(email.value === ""){
        email.classList.add('is-invalid'); 
    }if(password.value === ""){
        password.classList.add('is-invalid');
    }
}

email.addEventListener('keydown', () => {
    email.classList.remove("is-invalid")
})

password.addEventListener('keydown', () => {
    password.classList.remove("is-invalid")
})

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('ingresar').addEventListener('click', () =>{
      login();
    })
})
