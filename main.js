let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 100;
let tiempoRegresivo;
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');
let winAudio = new Audio('./Sounds/win.mp3');
let yesAudio = new Audio('./Sounds/yes.mp3');
let errorAudio = new Audio('./Sounds/error.mp3');
let gameoverAudio = new Audio('./Sounds/gameover.mp3');

yesAudio.volume = 0.20;
errorAudio.volume = 0.20;
winAudio.volume = 0.25;
gameoverAudio.volume = 0.25;

let imagenes = [
  'images/1.png',
  'images/2.png',
  'images/3.png',
  'images/4.png',
  'images/5.png',
  'images/6.png',
  'images/7.png',
  'images/8.png',
  'images/9.png',
  'images/10.png',
  'images/1.png',
  'images/2.png',
  'images/3.png',
  'images/4.png',
  'images/5.png',
  'images/6.png',
  'images/7.png',
  'images/8.png',
  'images/9.png',
  'images/10.png',
];
imagenes = imagenes.sort(() => Math.random() - 0.5);
console.log(imagenes);


// Función para salir  xxxxxx Luis H
function salir() {
  // Puedes realizar acciones de salida aquí si es necesario
  // Por ejemplo, mostrar un mensaje de despedida
  //alert("¡Hasta luego!");

  // Redirigir al usuario a la página de inicio
  window.location.href = "/";
}

// Asignar el evento de clic al botón de salir
document.getElementById("btnSalir").addEventListener("click", salir);
//   hasta  aqui 


function registrarUsuario() {
  var nombre = document.getElementById("nameInput").value;
  var contrasena = document.getElementById("passwordInput").value;

  // Validar que los campos no estén vacíos
  if (nombre === '' || contrasena === '') {
      alert("Por favor, completa todos los campos");
      return;
  }

  // Enviar datos al archivo PHP usando XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "registrar.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          alert(xhr.responseText); // Muestra la respuesta del servidor
      }
  };

  // Construir la cadena de datos a enviar
  var datos = "nombre=" + encodeURIComponent(nombre) + "&contrasena=" + encodeURIComponent(contrasena);

  // Enviar la solicitud
  xhr.send(datos);
}


function contarTiempo() {
  tiempoRegresivo = setInterval(() => {
    mostrarTiempo.innerHTML = `Tiempo restante: ${timer} segundos`;
    timer--;

    if (timer < 0) {
      clearInterval(tiempoRegresivo);
      bloquearTarjetas();
      gameoverAudio.play();
      Swal.fire({
        icon: "error",
        title: "Game Over",
        text: "¿Quieres intentar de nuevo?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          reiniciarJuego();
        }
      });
    }
  }, 1000);
}

function bloquearTarjetas() {
  let todasLasTarjetas = document.querySelectorAll('button');
  todasLasTarjetas.forEach(tarjeta => {
    tarjeta.disabled = true;
    if (tarjeta.style.backgroundImage === 'none') {
      tarjeta.style.backgroundImage = `url(${imagenes[tarjeta.id]})`;
      tarjeta.style.backgroundSize = '5%';
      tarjeta.style.backgroundPosition = 'cover';
    }
  });
}

function reiniciarJuego() {
  tarjetasDestapadas = 0;
  tarjeta1 = null;
  tarjeta2 = null;
  primerResultado = null;
  segundoResultado = null;
  movimientos = 0;
  aciertos = 0;
  temporizador = false;
  timer = 60;

  mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
  mostrarAciertos.innerHTML = 'Aciertos: 0';
  mostrarTiempo.innerHTML = 'Tiempo restante: 50 segundos';

  let todasLasTarjetas = document.querySelectorAll('button');
  todasLasTarjetas.forEach(tarjeta => {
    tarjeta.disabled = false;
    tarjeta.style.backgroundImage = 'none';
  });

  contarTiempo();
}

function destapar(id) {
  if (!temporizador) {
    contarTiempo();
    temporizador = true;
  }
  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if (tarjetasDestapadas === 1) {
    tarjeta1 = document.getElementById(id);
    primerResultado = imagenes[id];
    tarjeta1.style.backgroundImage = `url(${primerResultado})`;
    tarjeta1.style.backgroundSize = 'cover';
    tarjeta1.style.backgroundPosition = 'contain';
    tarjeta1.disabled = true;
    tarjeta1.style.backgroundRepeat = 'no-repeat';

  } else if (tarjetasDestapadas === 2) {
    tarjeta2 = document.getElementById(id);
    segundoResultado = imagenes[id];
    tarjeta2.style.backgroundImage = `url(${segundoResultado})`;
    tarjeta2.style.backgroundSize = 'cover';
    tarjeta2.style.backgroundPosition = 'contain';
    tarjeta2.disabled = true;
    tarjeta1.style.backgroundRepeat = 'no-repeat';

    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado === segundoResultado) {
      tarjetasDestapadas = 0;
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      yesAudio.play();

      // Almacenar el puntaje en localStorage
      localStorage.setItem('puntajeUsuario', aciertos);
    } else {
      errorAudio.play();
      setTimeout(() => {
        tarjeta1.style.backgroundImage = 'none';
        tarjeta2.style.backgroundImage = 'none';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 700);
    }

    if (aciertos === imagenes.length / 2) {
      clearInterval(tiempoRegresivo);
      winAudio.play();
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 👌`;
      mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🎉😎`;
      mostrarTiempo.innerHTML = "¡Ganaste!";
      Swal.fire({
        icon: "success",
        title: "¡Ganaste!",
        text: "¿Quieres jugar de nuevo?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          reiniciarJuego();
        }
      });
    }
  }
}
