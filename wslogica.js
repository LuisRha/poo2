// wslogica.js

function openNameInput() {
    document.getElementById("nameInputBox").style.display = "block";
}

function openNameInput() {
    document.getElementById("nameInputBox").style.display = "block";
}

function guardarNombre() {
    var nombre = document.getElementById("nameInput").value;
    
    // Verifica si el nombre no está vacío antes de proceder
    if (nombre.trim() !== "") {
        console.log("Nombre guardado:", nombre);

        // Almacena el nombre en el almacenamiento local del navegador.
        localStorage.setItem('nombreUsuario', nombre);

        // También puedes ocultar el cuadro de entrada después de guardar.
        document.getElementById("nameInputBox").style.display = "none";

        // También puedes limpiar el campo de entrada después de guardar.
        document.getElementById("nameInput").value = "";

        // Muestra una alerta indicando que los datos fueron almacenados correctamente.
        alert("¡Datos almacenados correctamente!");

       // Habilita el botón "Ir Ahora" después de guardar los datos
       document.getElementById("irAhoraBtn").disabled = false;

    } else {
        // Si el nombre está vacío, puedes mostrar una alerta indicando que debe ingresar un nombre.
        alert("Por favor, ingrese su nombre antes de guardar.");
    }
}

function redirigirAIndex() {
    // Verifica si el nombre está almacenado en el almacenamiento local
    var nombreGuardado = localStorage.getItem('nombreUsuario');

    if (nombreGuardado) {
        // Si el nombre está almacenado, redirige a la página del juego (index.html)
        window.location.href = "juego.html";
    } else {
        // Si el nombre no está almacenado, muestra una alerta
        alert("Por favor, ingrese y guarde su nombre antes de continuar.");
    }
}
