window.onload =inicializar;
var formJuegos;
var refDatabase;
var tbodyTablaJuegos;
var CREATE ="Añadir Frase";
var UPDATE = "Modificar Frase";
var modo = CREATE;
var refDeJuegosAEditar;

const admin = document.getElementById("administrador");

function inicializar(){
  formJuegos = document.getElementById("form-juegos");
  document.getElementById("rss").addEventListener("click", showRSS); //Llamar a la función de enseñar al RSS
  formJuegos.addEventListener("submit", enviarFraseAFirebase, false);
  tbodyTablaJuegos = document.getElementById("tbody-juego");
  refDatabase = firebase.database().ref().child("Frases");
  mostrarFrasesDelFirebase();
  comprobarAdmin();

}

function comprobarAdmin(){
  const auth = firebase.auth();
  const admin = document.getElementById("administrador");

firebase.auth().onAuthStateChanged( firebaseUser => {
  var user = firebase.auth().currentUser;
  if(user.uid == "xkth9tnPdyUNqMNk3DoHGmhQgyx2"){
    admin.classList.remove("hide");
  }
});
}



function showRSS(){
  createRSS();
}
function createRSS(){ //Creará el RSS
  var myRSS ='<?xml version="1.0" encoding="UTF-8"?>';
  myRSS += '<rss version="2.0">'
  myRSS += '<channel>'
  myRSS += '<title>ProbandoRSS</title>'
  myRSS += '<description>Cosas</description>'
  myRSS += '<link>www.miscosicas.com</link>'

  var MyNews = firebase.database().ref().child("Frases");
  MyNews.once("value", function(snapshot){
    var data = snapshot.val();
    var Link = new URL ('http://i0.kym-cdn.com/photos/images/facebook/000/993/851/491.jpg')
    for(var key in data){
      myRSS += "<item>"
      myRSS += "<title> Nueva entrada de " + data[key].NombreUsuario + "</title>";
      myRSS += "<description> El usuario "+ data[key].NombreUsuario+" ha añadido una frase del personaje " + data[key].Personaje + "</description>";
      myRSS += "<link>" +Link+"</link>"
      myRSS += "</item>"

    }
    myRSS += '</channel>'
    myRSS += '</rss>'
    console.log(myRSS);
    window.open("data:type:RSS.xml,"+encodeURIComponent(myRSS), "Test", "width=300,height=300,scrollbars=1,resizable=1");
  });
}
function mostrarFrasesDelFirebase(){
  refDatabase.on("value", function(snap){
    var datos = snap.val();
    var filasAMostrar = "";
    for(var key in datos){
      filasAMostrar += "<tr>" +
      "<td>" + datos[key].NombreUsuario + "</td>" +
      "<td>" + datos[key].Personaje + "</td>" +
      "<td>" + datos[key].Frase + "</td>" +
      "<td>" + datos[key].juego + "</td>" +
      '<td>' +
      '<button class="btn btn-info editar" data-juegos="' + key +'">' +
      '<span class ="glyphicon glyphicon-edit"></span>'+
      '</button>' +
      '</td>' +
      '<td>' +
      '<button class="btn btn-danger borrar" data-juegos="' + key +'">' +
      '<span class ="glyphicon glyphicon-trash"></span>'+
      '</button>' +
      '</td>'
      "</tr>"
    }
    tbodyTablaJuegos.innerHTML = filasAMostrar;
    if(filasAMostrar != ""){
      var  elementosAEditar = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosAEditar.length; i++){
        elementosAEditar[i].addEventListener("click", EditarFrase, false);
      }
      var  elementosABorrar = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosABorrar.length; i++){
        elementosABorrar[i].addEventListener("click", borrarFrase, false);
      }
    }
  });
}
function EditarFrase(){
  var keyDeJuegosAEditar = this.getAttribute("data-juegos");
  refDeJuegosAEditar = refDatabase.child(keyDeJuegosAEditar);
  refDeJuegosAEditar.once("value", function(snap){
    var datos = snap.val();
    document.getElementById("NombreUsuario-tabla").value = datos.NombreUsuario;
    document.getElementById("Personaje-tabla").value = datos.Personaje;
    document.getElementById("Frase-tabla").value = datos.Frase;
    document.getElementById("Juego-tabla").value = datos.juego;
  });
  document.getElementById("boton-enviar-frase").value = UPDATE;
  modo = UPDATE;
}
function borrarFrase(){
  var keyDeJuegosABorrar = this.getAttribute("data-juegos");
  var refDeJuegosABorrar = refDatabase.child(keyDeJuegosABorrar);
  refDeJuegosABorrar.remove();
}
function enviarFraseAFirebase(event){
  event.preventDefault();
  switch (modo) {
    case CREATE:
    refDatabase.push({
      NombreUsuario: event.target.NombreDeUsuario.value,
      Personaje: event.target.Personaje.value,
      Frase: event.target.Frase.value,
      juego:  event.target.Juego.value
    });
    break;
    case UPDATE:
    refDeJuegosAEditar.update({
      NombreUsuario: event.target.NombreDeUsuario.value,
      Personaje: event.target.Personaje.value,
      Frase: event.target.Frase.value,
      juego:  event.target.Juego.value
    });
    modo = CREATE;
    document.getElementById("boton-enviar-frase").value = CREATE;
    break;
  }
  formJuegos.reset();
}
