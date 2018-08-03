window.onload = inicializar;
var fichero;
var storageRef;
var imagenesFBRef;

function inicializar(){
//Mostrar imagenesFB
fichero = document.getElementById("fichero");
fichero.addEventListener("change", subirImagenAFirebase, false);
storageRef = firebase.storage().ref();
imagenesFBRef = firebase.database().ref().child( "imagenesFB");
mostrarImagenesDelFirebase();


//Fin de mostrar imagenes

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogout = document.getElementById("btnLogout");
const admin = document.getElementById("administrador");
const galeria = document.getElementById("galeria");
const MensajeError = document.getElementById("MensajeError");

//Inicio del login
//EventoLogin
btnLogin.addEventListener("click", e=>{
//De aqui se obtienen el email y password
const email = txtEmail.value;
const password = txtPassword.value;
const auth = firebase.auth();
//Sign in
const promise = auth.signInWithEmailAndPassword(email,password);
promise.catch(e => MensajeError.innerHTML="Usuario y/o contraseña errónea" );
});

//EventoSignUp
btnSignUp.addEventListener("click", e=>{
//Todavía no se ha añadido que sea un email autentico
const email = txtEmail.value;
const password = txtPassword.value;
const auth = firebase.auth();
//Creará Usuarios
const promise = auth.createUserWithEmailAndPassword(email,password);
promise.catch(e => console.log(e.message));
});

btnLogout.addEventListener("click", e=>{
firebase.auth().signOut();
});
//Añadimos un listener en tiempo preventDefault
firebase.auth().onAuthStateChanged( firebaseUser => {
if (firebaseUser){

console.log(firebaseUser);
txtEmail.classList.add("hide");
txtPassword.classList.add("hide");
btnLogout.classList.remove("hide");
btnLogin.classList.add("hide");
btnSignUp.classList.add("hide");
galeria.classList.remove("hide")
MensajeError.innerHTML ="";
comprobarAdmin();
}else{
console.log("No logueado");
txtPassword.classList.remove("hide");
txtEmail.classList.remove("hide");
admin.classList.add("hide");
btnLogout.classList.add("hide");
btnLogin.classList.remove("hide");
btnSignUp.classList.remove("hide");
galeria.classList.add("hide")
}//FinElse
});
//Fin del login

function comprobarAdmin(){
var user = firebase.auth().currentUser
if(user.uid == "xkth9tnPdyUNqMNk3DoHGmhQgyx2"){
  admin.classList.remove("hide");
}
}
}

function mostrarImagenesDelFirebase(){
imagenesFBRef.on("value", function(snapshot){
  var datos = snapshot.val();
  var result = "";
  for (var key in datos){
    result += '<img width="200" class="img-thumbnail" src="' + datos[key].url + '"/>';
  }
  document.getElementById("imagenesfirebase").innerHTML = result;
})
}




function subirImagenAFirebase(){
  var imagenASubir = fichero.files[0];

  var uploadTask = storageRef.child('imagenes/' + imagenASubir.name).put(imagenASubir);

  document.getElementById("progreso").className = "";

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var barraProgreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  document.getElementById("barra-Progreso").style.width= barraProgreso + "%"
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
  alert("hubo error");
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  var downloadURL = uploadTask.snapshot.downloadURL;

  crearNodoEnBDFirebase(imagenASubir.name, downloadURL);
  document.getElementById("progreso").className = "hidden";
});


}

function crearNodoEnBDFirebase(nombreImagen, downloadURL){
imagenesFBRef.push({nombre: nombreImagen, url: downloadURL});
}
