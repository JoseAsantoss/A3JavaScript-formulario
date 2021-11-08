const submit = document.querySelector('.submit');
const input_nombre = document.querySelector('.input_nombre');
const input_dir = document.querySelector('.input_dir');
const input_tel = document.querySelector('.input_tel');
const input_email = document.querySelector('.input_email');
const radio = document.querySelectorAll('.radio');
const checkbox = document.querySelectorAll('.checkbox');
const mensajeError = document.querySelectorAll('.mensajeError');
const mensajeError1 = document.querySelector('.mensajeError1');
const mensajeError2 = document.querySelector('.mensajeError2');
const mensajeError3 = document.querySelector('.mensajeError3');
const mensajeError4 = document.querySelector('.mensajeError4');
const mensajeError5 = document.querySelector('.mensajeError5');
const mensajeError6 = document.querySelector('.mensajeError6');
const modal = document.querySelector('.modal');
const botonCerrarModal = document.querySelector('.cerrar_modal');
const overlay = document.querySelector('.overlay');
const infoPedido = document.querySelector('.infoPedido');
const infoPedido2 = document.querySelector('.infoPedido2');
const mostrarPizza = document.querySelector('.pizza');
const mostrarIngredientes = document.querySelector('.ingredientes');
const mostrarPrecio = document.querySelector('.precioTotal');



submit.addEventListener('click', function(event) {
    let formValido = true;
    event.preventDefault();

    // Reseteamos los mensajes de error:
    mensajeError.forEach(function(mensaje) {
        mensaje.textContent = '';
    });

    // Nombre relleno y comenzando por mayúsculas:
    const reNom = /^[A-Z]/;
    if(!reNom.test(input_nombre.value) || input_nombre.value.trim() == '') {
        mensajeError1.textContent = "El nombre debe comenzar por mayúsculas";
        formValido = false;
    }

    // Dirección rellena
    if(input_dir.value.trim() == '') {
        mensajeError2.textContent = "La dirección debe ser válida";
        formValido = false;
    }

    // Teléfono relleno y en formato correcto:
    const reTelf = /^[6-9][0-9]{8}$/;
    if(!reTelf.test(input_tel.value) || input_tel.value.trim() == '') {
        mensajeError3.textContent = "El teléfono debe tener un formato adecuado";
        formValido = false;
    }

    // Email relleno y en formato correcto:
    const reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!reEmail.test(input_email.value) || input_email.value.trim() == '') {
        mensajeError4.textContent = "El email debe tener un formato adecuado";
        formValido = false;
    }

    // Debe seleccionarse al menos un radio button
    let checked = false;
    radio.forEach(function(rad) {
        if(rad.checked) {
            checked = true;
        }
    });

    if(!checked) {
        mensajeError5.textContent = 'Debe seleccionar un tamaño para la pizza';
        formValido = false;
    }

    // Debe seleccionar al menos un checkbox
    checked = false;
    checkbox.forEach(function(cbox) {
        if(cbox.checked) {
            checked = true;
        }
    });

    if(!checked) {
        mensajeError6.textContent = 'Debe seleccionar al menos un ingrediente';
        formValido = false;
    }

    // Si el formulario es válido, abrimos modal mostrando información al cliente
    if(formValido) {
        abrirModal();
        calcularDatos();
    }

});


function abrirModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function cerrarModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Podemos cerrar el modal clicando el botón "X"
botonCerrarModal.addEventListener('click', function() {
    cerrarModal();
});

// Podemos cerrar el modal clicando fuera de éste
overlay.addEventListener('click', function() {
    cerrarModal();
});

// Podemos cerrar el modal pulsando "esc"
document.addEventListener('keydown', function(event) {
    if(event.key === 'Escape') {
        cerrarModal();
    }
});


// Calcular datos varios y precio
function calcularDatos() {
    let precio = 0;
    let frase1 = 'Pizza: ';
    let frase2 = 'Ingredientes: ';
    const ingredientes = [];

    radio.forEach(function(rad) {
        if(rad.checked) {
            precio += Number(rad.getAttribute('data-id'));
            frase1 += `${rad.value}.`;
        }
    });

    checkbox.forEach(function(cbox) {
        if(cbox.checked) {
            precio += 1;
            ingredientes.push(cbox.value);
        }
    });

    ingredientes.forEach(function(ingred, index) {
        if(index !== ingredientes.length -1) {
            frase2 += `${ingred} - `;
        } else {
            frase2 += ` ${ingred}.`
        }
    })

    mostrarPizza.textContent = frase1;
    mostrarIngredientes.textContent = frase2;
    mostrarPrecio.textContent = `Precio total: ${precio}€`;

    // Información a mostrar por el modal
    const mostrarFecha = new Intl.DateTimeFormat('es-Es', {
        year: 'numeric', month: 'numeric', day: 'numeric',
    }).format(new Date());

    const mostrarHora = new Intl.DateTimeFormat('es-Es', {
        hour: 'numeric', minute: 'numeric',
    }).format(new Date());

    infoPedido.textContent = `Muchas gracias, ${input_nombre.value}, por su pedido realizado el ${mostrarFecha} a las ${mostrarHora}h.`;
    infoPedido2.textContent = `Por favor, compruebe el email de confirmación enviado a: ${input_email.value}`;

}




