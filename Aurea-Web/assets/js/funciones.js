// Asegura que sea global para onsubmit="return RegistroUsuario()"
window.RegistroUsuario = function () {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value.trim().toLowerCase();
    const contrasena = document.getElementById("contrasena").value;
    const confi_contrasena = document.getElementById("confi_contrasena").value;
    const telefono = document.getElementById("telefono").value;
    const mensaje = document.getElementById("mensaje");

    const regexCorreo = /^[a-z0-9._%+-]+@(gmail\.com|duoc\.cl|profesor\.duoc\.cl)$/i;

    // --- CORREO ---
    if (!correo) {
        mensaje.textContent = "El correo es obligatorio.";
        mensaje.style.color = "red";
        return false;
    }
    if (correo.length > 100) {
        mensaje.textContent = "El correo no puede superar los 100 caracteres.";
        mensaje.style.color = "red";
        return false;
    }
    if (!regexCorreo.test(correo)) {
        mensaje.textContent = "El correo debe ser @gmail.com, @duoc.cl o @profesor.duoc.cl.";
        mensaje.style.color = "red";
        return false;
    }

    // contraseña de 4 a 10 caracteres
    if (!contrasena) {
        mensaje.textContent = "La contraseña es obligatoria.";
        mensaje.style.color = "red";
        return false;
    }
    if (contrasena.length < 4 || contrasena.length > 10) {
        mensaje.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
        mensaje.style.color = "red";
        return false;
    }

    // --- CONFIRMACIÓN ---
    if (confi_contrasena !== contrasena) {
        mensaje.textContent = "Las contraseñas no coinciden, ingréselas nuevamente.";
        mensaje.style.color = "red";
        return false;
    }

    // --- GUARDADO ---
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const nuevoUsuario = { nombre, correo, contrasena, telefono };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensaje.textContent = "¡Áurea te espera! Redirigiendo...";
    mensaje.style.color = "green";

    setTimeout(function () {
        window.location.href = "../index.html";
    }, 1500);

    return false; // corta el envío por defecto
};



function iniciarSesion() {
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;
    let mensaje = document.getElementById("mensaje");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioValido = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

    if (usuarioValido) {
        mensaje.textContent = "¡Inicio de sesión exitoso! Redirigiendo...";
        mensaje.style.color = "green";
        setTimeout(function() {
        window.location.href = "../index.html"; 
        }, 1500);

    } else {
        mensaje.textContent = "Correo o contraseña incorrectos.";
        mensaje.style.color = "red";
    }

  

    return false;
}


function contacto() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let contenido = document.getElementById("contenido").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuarioValido = usuarios.find(u => u.correo === correo);


    mensaje = document.getElementById("mensaje");

    if (usuarioValido) {
        mensaje.textContent = "Gracias " + nombre + " por contactarnos. Hemos recibido tu mensaje y te responderemos a la brevedad al correo: " + correo;
        mensaje.style.color = "green";
    } else {
        mensaje.textContent = "Correo no encontrado";
        mensaje.style.color = "red";
    }
    return false;
}


function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


function agregarAlCarrito(nombre, precio) {
  let carrito = obtenerCarrito();
  carrito.push({ nombre, precio });
  guardarCarrito(carrito);
  alert(`${nombre} fue añadido al carrito 🛒`);
}

function mostrarCarrito() {
  let carrito = obtenerCarrito();
  let lista = document.getElementById("lista-carrito");
  let total = 0;

  if (!lista) return; 

  lista.innerHTML = "";

  carrito.forEach((producto, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td>
        <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">❌</button>
      </td>
    `;
    lista.appendChild(row);
    total += producto.precio;
  });

  document.getElementById("total").innerText = total.toLocaleString();

  
  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", () => {
      eliminarDelCarrito(btn.dataset.index);
    });
  });
}

function eliminarDelCarrito(index) {
  let carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  
  document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", () => {
      let nombre = btn.dataset.nombre;
      let precio = parseInt(btn.dataset.precio);
      agregarAlCarrito(nombre, precio);
    });
  });

  
  mostrarCarrito();
});

