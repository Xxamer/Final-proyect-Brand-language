window.onload = inicializar;

function inicializar(){
  const auth = firebase.auth();
  const admin = document.getElementById("administrador");

firebase.auth().onAuthStateChanged( firebaseUser => {
  var user = firebase.auth().currentUser;
  if(user.uid == "xkth9tnPdyUNqMNk3DoHGmhQgyx2"){
    admin.classList.remove("hide");
  }
});

}
