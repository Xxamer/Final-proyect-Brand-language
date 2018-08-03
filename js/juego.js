window.onload = inicializar;
var fondoVisible = false;
var Sombra = false;


//Del firebase
var datos;
function inicializar(){

	var formulario = document.getElementById("CambiarFondo");
	formulario.addEventListener("click", CambiaFondo);
	var CambiarFondo = document.getElementById("BorrarFormulario");
	CambiarFondo.addEventListener("click", BorraFormulario);
	var comprueba = document.getElementById("button");
	comprueba.addEventListener("click", check);
	var picture = document.getElementById("picture");
	picture.addEventListener("mouseover", quitarSombra);
	picture.addEventListener("mouseout", ponerSombra);
	refDatabase=firebase.database().ref().child("Formulario");
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

function quitarSombra(){
	picture.style.boxShadow = "0px 0px 0px";
}

function ponerSombra(){
	Sombra = !Sombra;
	if (Sombra){
		picture.style.boxShadow = "10px 10px 10px Yellow";
	} else {
		picture.style.boxShadow = "10px 10px 10px Red";
	}
}

function CambiaFondo(){
	fondoVisible = !fondoVisible;

	if (fondoVisible) {
		document.body.style.backgroundImage = "url('images/Background21.jpg')";
	} else {
		document.body.style.backgroundImage = "url('images/Background.jpg')";
	}
}

function BorraFormulario(){
	document.getElementById("obligatorio").innerHTML = "";
	document.getElementById("obligatorio1").innerHTML = "";
	document.getElementById("obligatorio2").innerHTML = "";
	document.getElementById("obligatorio3").innerHTML = "";
	document.getElementById("obligatorio4").innerHTML = "";
	document.getElementById("Mensaje").innerHTML = "";
	document.getElementById("Numero_Correcto").innerHTML = "";
	document.getElementById("Numero_Fallado").innerHTML = "";
	document.getElementById("picture").src = "images/Juego/transparente.png";
	picture.style.boxShadow = "10px 10px 10px Purple";
}


function check(event){

	var Pregunta1 = document.quiz.Pregunta1.value;
	var Pregunta2 = document.quiz.Pregunta2.value;
	var Pregunta3 = document.quiz.Pregunta3.value;
	var Pregunta4 = document.quiz.Pregunta4.value;
	var Pregunta5 = document.quiz.Pregunta5.value;
	var Pregunta6 = document.quiz.Pregunta6.value;
	var correcto = 0;
	var fallo = 0;

	if (Pregunta1 == "") {
		document.getElementById("Pregunta1").scrollIntoView();
		document.getElementById("campo_vacio").style.visibility = "visible";
		document.getElementById("obligatorio").innerHTML = "*Lo siento, este campo es obligatorio";
		event.preventDefault();
		return;

	}
	if (Pregunta2 == "") {
		document.getElementById("Pregunta2").scrollIntoView();
		document.getElementById("campo_vacio1").style.visibility = "visible";
		document.getElementById("obligatorio1").innerHTML = "*Este tambien";
		event.preventDefault();
		return;

	}
	if (Pregunta3 == "") {
		document.getElementById("Pregunta3").scrollIntoView();
		document.getElementById("campo_vacio2").style.visibility = "visible";
		document.getElementById("obligatorio2").innerHTML = "*Vaya, pues este tambien...";
		event.preventDefault();
		return;

	}

	if (Pregunta4 == "") {
		document.getElementById("Pregunta4").scrollIntoView();
		document.getElementById("campo_vacio3").style.visibility = "visible";
		document.getElementById("obligatorio3").innerHTML = "*Al menos inténtalo, ¿No?";
		event.preventDefault();
		return;

	}
	if (Pregunta5 == "") {
		document.getElementById("Pregunta5").scrollIntoView();
		document.getElementById("campo_vacio4").style.visibility = "visible";
		document.getElementById("obligatorio4").innerHTML = "*Ya paro, lo juro";
		event.preventDefault();
		return;

	}



	if (Pregunta1 == "Solid Snake") {
		correcto++;
	} else {
		fallo++;
	}
	if (Pregunta2 == " Metal Gear Solid 3 ") {
		correcto++;
	} else {
		fallo++;
	}
	if (Pregunta3 == "Hideo_Kojima") {
		correcto++;
	} else {
		fallo++;
	}

	if (Pregunta4 == "Correcto") {
		correcto++;
	} else {
		fallo++;
	}

	if (Pregunta5 == "Correcto") {
		correcto++;
	} else {
		fallo++;
	}
	if (quiz.Pregunta6.checked){
		correcto++;
	} else {
		fallo++;
	}



	var pictures = ["images/Juego/KonamiTears.jpg", "images/Juego/Raiden2.gif", "images/Juego/Fuck-konami.jpg", " images/Juego/Wolf.gif", "images/Juego/ttxmHta.gif", "images/Juego/Box.jpg", "images/Juego/Kojima.gif" ];
	var Mensaje = ["Lo siento, no has acertado ninguna :(", " Estudiate la página otra vez ", "Bueno, poco a poco, te pongo el 5 para no hacer recuperación", "¡Bien hecho!", "Solidus Snake estaría orgulloso de ti." ,"Eres casi un experto <3", "Perfecto, eres un verdadero fan <3"];
	var score;

	if (correcto == 0) {
		score = 0;
	}

	if (correcto == 1) {
		score = 1;
	}


	if (correcto == 2) {
		score = 2;
	}

	if (correcto == 3) {
		score = 3;
	}
	if (correcto == 4) {
		score = 4;
	}
	if (correcto == 5) {
		score = 5;
	}
	if (correcto == 6) {
		score = 6;
	}
	inicializarFirebase();
	event.preventDefault();
	document.getElementById("after_submit").style.visibility = "visible";
	document.getElementById("Mensaje").innerHTML = Mensaje[score];
	document.getElementById("Numero_Correcto").innerHTML = "Has acertado " + correcto + " pregunta(s).";
	document.getElementById("Numero_Fallado").innerHTML = "Has fallado " + fallo + " pregunta(s).";
	document.getElementById("picture").src = pictures[score];
//Subir datos a Firebase

}

function inicializarFirebase(){
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
	 	tbodyTablaJuegos = document.getElementById("tbody-juego");
  	refDatabase.on("value", function(snap){
    var datos = snap.val();
    var filasAMostrar = "";
    for(var key in datos){
      filasAMostrar += "<tr>" +
                        "<td>" + datos[key].Pregunta1 + "</td>" +
                        "<td>" + datos[key].Pregunta2 + "</td>" +
                        "<td>" + datos[key].Pregunta3 + "</td>" +
                        "<td>" + datos[key].Pregunta4 + "</td>" +
                        '<td>' + datos[key].Pregunta5 + "</td>" +
												'<td>' + datos[key].Pregunta6 + "</td>" +
                        '</td>'
                        "</tr>"
													}
    tbodyTablaJuegos.innerHTML = filasAMostrar;

});
}
