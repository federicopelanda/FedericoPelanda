let nombre1 = document.getElementById("nombre1");
let nombre2 = document.getElementById("nombre2");
let apellido1 = document.getElementById("apellido1");
let apellido2 = document.getElementById("apellido2");
let email = document.getElementById("email");
let inputAvatar = document.getElementById("inputAvatar");
let avatar = document.getElementById("avatar");
let telefono = document.getElementById("telefono");
var base64String = "";


function cargarDatos(){
  email.value = localStorage.getItem("user");
  if (localStorage.getItem("miPerfil") != null){
    let miPerfil = JSON.parse(localStorage.getItem("miPerfil"))
  nombre1.value = miPerfil.nombre1;
  nombre2.value = miPerfil.nombre2;
  apellido1.value = miPerfil.apellido1
  apellido2.value = miPerfil.apellido2
  telefono.value = miPerfil.telefono
  avatar.src = "data:image/png;base64," + localStorage.getItem("imagenAvatar");
  }if(localStorage.getItem("imagenAvatar") == null){
    avatar.src = "img/img_perfil.png";
  };
};

  document.addEventListener("DOMContentLoaded",()=>{
    cargarDatos();
  });

  function uploadedImage() {
    if(!nombre1.validity.valueMissing && !apellido1.validity.valueMissing && !email.validity.valueMissing  && !email.validity.typeMismatch){
    var file = document.querySelector(
      'input[type=file]')['files'][0];
    var reader = new FileReader();
    reader.onload = function () {
      base64String = reader.result.replace("data:", "")
        .replace(/^.+,/, "");
      imageBase64Stringsep = base64String;
      console.log(base64String);
      localStorage.setItem("imagenAvatar", base64String);
    }
    reader.readAsDataURL(file);
  }
};

  function validarCampos(){

    let cambiosMiPerfil={}

  if(nombre1.validity.valueMissing){
      nombre1.classList.add('is-invalid'); 
  }if(apellido1.validity.valueMissing){
      apellido1.classList.add('is-invalid');
  }if(email.validity.valueMissing || email.validity.typeMismatch){
    email.classList.add('is-invalid');
  }else if(!nombre1.validity.valueMissing && !apellido1.validity.valueMissing && !email.validity.valueMissing  && !email.validity.typeMismatch){
    localStorage.setItem('user', email.value);
    cambiosMiPerfil.nombre1 = nombre1.value;
    cambiosMiPerfil.nombre2 = nombre2.value;
    cambiosMiPerfil.apellido1 = apellido1.value;
    cambiosMiPerfil.apellido2 = apellido2.value;
    cambiosMiPerfil.telefono = telefono.value;
    localStorage.setItem("miPerfil", JSON.stringify(cambiosMiPerfil));
    location.href = "/my-profile.html" 
    
  }
  };

  inputAvatar.addEventListener('input', (e) => {
    avatar.src = URL.createObjectURL(e.target.files[0])
  });

  email.addEventListener('keydown', () => {
    email.classList.remove("is-invalid")
  });

  nombre1.addEventListener('keydown', () => {
    nombre1.classList.remove("is-invalid")
  });

  apellido1.addEventListener('keydown', () => {
    apellido1.classList.remove("is-invalid")
  });
  
document.getElementById('guardarCambios').addEventListener('click', () => {
  validarCampos();
  uploadedImage();
});
