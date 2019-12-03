const listaMensaje = document.querySelector(".container-request");

function eventListeners() {
	//Cuando se envia el formulario
	document.querySelector("#form").addEventListener("submit", agregarMessage);
	//Borrar mensaje
	listaMensaje.addEventListener("click", borrarMensaje);
	//Contenido cargado
	document.addEventListener("DOMContentLoaded", localStorageListo());
}

function agregarMessage(e) {
	e.preventDefault();
	//Leer el valor del textarea
	const mensaje = document.querySelector(".input").value;

	if (mensaje !== "") {
		//Creo un elemento "li" y "a"
		const botonBorrar = document.createElement("a"),
			li = document.createElement("li");

		//Asigno estilos al boton borrar y al li
		li.classList.add("lista");
		botonBorrar.classList.add("boton-borrar");
		botonBorrar.innerText = "X";
		//Le asigno el valor al li
		li.innerText = mensaje;
		//Agrego el li a Lista-mensaje y el boton borra a cada li
		listaMensaje.appendChild(li);
		li.appendChild(botonBorrar);

		//Llamada a al funcion para anadir mensaje al localstorage
		agregarMensajeLocalStorage(mensaje);
	} else {
		mensajeError();
	}
}

//Borrar mensaje
function borrarMensaje(e) {
	e.preventDefault();
	if (e.target.className === "boton-borrar") {
		e.target.parentElement.remove();
		borrarMensajeLocalStorage(e.target.parentElement.innerText);
	}
}

//Agregar mensaje al local storage
function agregarMensajeLocalStorage(mensaje) {
	let mensajes;
	mensajes = obtenerMensajeLocalStorage();
	//anadir mensaje
	mensajes.push(mensaje);
	//Convertir de string a arreglo para local storage
	localStorage.setItem("Mensajes", JSON.stringify(mensajes));
}

//Comprobar que haya elementos en localstorage, y retorna un arreglo
function obtenerMensajeLocalStorage() {
	let mensajes;
	if (localStorage.getItem("Mensajes") === null) {
		mensajes = [];
	} else {
		mensajes = JSON.parse(localStorage.getItem("Mensajes"));
	}
	return mensajes;
}
//Mostrar datos del local storage en la lista
function localStorageListo() {
	let mensajes;
	mensajes = obtenerMensajeLocalStorage();
	mensajes.forEach(mensaje => {
		const botonBorrar = document.createElement("a"),
			li = document.createElement("li");
		li.classList.add("lista");
		li.innerText = mensaje;
		botonBorrar.classList.add("boton-borrar");
		botonBorrar.innerText = "X";
		li.appendChild(botonBorrar);
		listaMensaje.appendChild(li);
	});
}
//Eliminar mensaje del local storage
function borrarMensajeLocalStorage(mensaje) {
	let mensajes, mensajeBorrar;
	//Elimina la X del mensaje
	mensajeBorrar = mensaje.substring(0, mensaje.length - 1);
	//Verifica si hay mensajes en localstorage
	mensajes = obtenerMensajeLocalStorage();
	//Itera cada mensaje del local y los compara con el que quiere borrar
	mensajes.forEach((mensaje, index) => {
		if (mensajeBorrar === mensaje) {
			mensajes.splice(index, 1);
		}
	});
	//Finalmente los borra del local
	localStorage.setItem("Mensajes", JSON.stringify(mensajes));
}
//coloca un mensaje de error si esta vacio el input
function mensajeError() {
	const mensajeError = document.createElement("span");
	mensajeError.classList.add("messageError");
	mensajeError.innerText = "Campo vacio";
	document.body.appendChild(mensajeError);
	if (mensajeError) {
		setTimeout(() => {
			mensajeError.classList.add("messageOut");
		}, 2000);
	}
}

eventListeners();
