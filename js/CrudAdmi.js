window.onload = inicializar;
var fondoVisible = false;
var Sombra = false;
var formJuegos;
var refDatabase;
var tbodyTablaJuegos;
var CREATE ="Añadir linea de preguntas";
var UPDATE = "Modificar linea de preguntas";
var modo = CREATE;
var refDeJuegosAEditar;

function inicializar(){
  formJuegos = document.getElementById("formjuegos");
  formJuegos.addEventListener("submit", enviarFraseAFirebase, false);
	refDatabase=firebase.database().ref().child("Formulario");

mostrarFrasesDelFirebase();
}

function inicializarFirebase(event){
document.getElementById("Pregunta1").value =  document.quiz.Pregunta1.value;
document.getElementById("Pregunta2").value = document.quiz.Pregunta2.value;
document.getElementById("Pregunta3").value = document.quiz.Pregunta3.value;
document.getElementById("Pregunta4").value = document.quiz.Pregunta4.value;
document.getElementById("Pregunta5").value = document.quiz.Pregunta5.value;
document.getElementById("Pregunta6").value = document.quiz.Pregunta6.value;
	refDatabase.push({
		Pregunta1: document.quiz.Pregunta1.value,
		Pregunta2: document.quiz.Pregunta2.value,
		Pregunta3: document.quiz.Pregunta3.value,
		Pregunta4: document.quiz.Pregunta4.value,
		Pregunta5: document.quiz.Pregunta5.value,
		Pregunta6: document.quiz.Pregunta6.value
	});
}
 //Mostrar datos del firebase
 function mostrarFrasesDelFirebase(){
   refDatabase.on("value", function(snap){
     var datos = snap.val();
     var filasAMostrar = "";
     for(var key in datos){
       filasAMostrar += "<tr>" +
       "<td>" + datos[key].Pregunta1 + "</td>" +
       "<td>" + datos[key].Pregunta2 + "</td>" +
       "<td>" + datos[key].Pregunta3 + "</td>" +
       "<td>" + datos[key].Pregunta4 + "</td>" +
       "<td>" + datos[key].Pregunta5 + "</td>" +
       "<td>" + datos[key].Pregunta6 + "</td>"+
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
    tbodyjuego.innerHTML = filasAMostrar;
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
     document.getElementById("Pregunta1-tabla").value = datos.Pregunta1;
     document.getElementById("Pregunta2-tabla").value = datos.Pregunta2;
     document.getElementById("Pregunta3-tabla").value = datos.Pregunta3;
     document.getElementById("Pregunta4-tabla").value = datos.Pregunta4;
     document.getElementById("Pregunta5-tabla").value = datos.Pregunta5;
     document.getElementById("Pregunta6-tabla").value = datos.Pregunta6;
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
      Pregunta1: event.target.Pregunta1.value,
      Pregunta2: event.target.Pregunta2.value,
      Pregunta3: event.target.Pregunta3.value,
      Pregunta4: event.target.Pregunta4.value,
      Pregunta5: event.target.Pregunta5.value,
      Pregunta6: event.target.Pregunta6.value,
     });
     break;
     case UPDATE:
     refDeJuegosAEditar.update({
       Pregunta1: event.target.Pregunta1.value,
       Pregunta2: event.target.Pregunta2.value,
       Pregunta3: event.target.Pregunta3.value,
       Pregunta4: event.target.Pregunta4.value,
       Pregunta5: event.target.Pregunta5.value,
       Pregunta6: event.target.Pregunta6.value,
     });
     modo = CREATE;
     document.getElementById("boton-enviar-frase").value = CREATE;
     break;
   }
   formJuegos.reset();
 }
