function login(){
    email = document.getElementById('email');
    password = document.getElementById('password');

    if(email.value !== "" && password.value !== ""){
        localStorage.setItem('user',JSON.stringify(email.value));
        location.href = "index.html"
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

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    localStorage.setItem('user',JSON.stringify(profile));
    location.href = "index.html"
}
