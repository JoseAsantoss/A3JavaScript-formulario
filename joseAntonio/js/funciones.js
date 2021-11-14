window.onload = function() {

    submitButton = document.getElementById('submit-btn');
    buttonButton = document.getElementById('add-btn');
    const caja = document.querySelectorAll('input');

    for (i = 0; i<caja.length; i++) {
        if(caja[i].name == 'nombre' || caja[i].name == 'email' || caja[i].name == 'telefono' || caja[i].name == 'direccion') {
            const evento = caja[i];

            evento.addEventListener('keyup', 
                function() {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        console.log(`input ${evento.name},  value: ${evento.value}`);
                    }, 300);

                    validation(evento);
                }
            );

          /*   break; */
        }

        if(caja[i].name == 'tamanio' || caja[i].name == 'ingrediente') {
            const evento2 = caja [i];

            evento2.addEventListener('click', function(){
                console.log(`input ${evento2.name} value:  ${evento2.value} checked: ${evento2.checked}`);
                checka(evento2);
            });
        }

    }

    buttonButton.addEventListener('click', () => {
        añadirFila();
        submitControlador();
    })

}

/* Variables globales */
const tam = {
    pequeña: 5,
    mediana: 10,
    grande: 15,
}
let submitButton;
let buttonButton;
let arrayAux=[];
let tamanio;
let timeout = null;
let errors = {
    nombre: true,
    email: true,
    telefono: true,
    direccion: true,
    tamanio: true,
    ingrediente: true,
};

/*La expresión regular de nombre establece que
empiece por una letra mayúscula y sigan
entre 8 y 30 caracteres, mayúsculas o minúsculas
o _ y acabe por alguna de estas.
El usuario introduce nombre y apellidos)*/
const nomformatRegex = /^([A-ZÁÉÍÓÚ]{1}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/g;

/*Con la expresión regular del email, pretendemos que
sean válidos estos emails prototipo:
    test@patata.com
    very.common@patata.com
    disposable.style.email.with+symbol@patata.com
    other.email-with-hyphen@pa_tata.com
    fully-qualified-domain@patata_2.net
    user.name+tag+sorting@patata.org
    user_name_test@pata_12.es

La primera parte tenga minúsculas, números, guiones, guiones bajos,
puntos o +, entre 3 y 25 caracteres;; arroba;; dominio con letras,
números o _ ;; y .com/.es/.org ... */
const mailformatRegex = /^[a-zA-Z0-9]{1}[a-z0-9-_.+]{3,25}@[a-z0-9_]{2,12}.[a-z]{2,6}$/;

/*El teléfono empezará por 6,7,8,9 que son los números
prefijo usados en España, y tendrá otros 8 números, haciendo
un teléfono de 9 dígitos típico de España*/
const telformatRegex = /^[0-9/^[6|7|8|9]{1}[0-9]{8,8}$/;

/**********************/
/********  Funciones *********/
/* Validation(evento) recoge el evento y valida que cumpla los
requisitos de la expresión regular.
En el caso de dirección, lo que se comprueba que la dirección
no sea menor de 15 caracteres ya que el Regex de una dirección
es extremandamente complicado.
De esta forma también estamos validando que los campos no puedan
ser vacios. */
validation  = (evento) => {
    if(evento.name == 'nombre') {
        let vf = nomformatRegex.test(evento.value);
        console.log(`El valor de vf es: ${vf}`);
        if(!vf) {
            console.log('me devuelve false');
            mostrarError(true, evento);
        }else {
            console.log('me devuelve true');
            mostrarError(false, evento);
            errors.nombre = false;
        }
    }

    if(evento.name == 'direccion') {
        if(evento.value.length < 15) {
            mostrarError(true, evento);
        }else {
            mostrarError(false, evento);
            errors.direccion = false;
        }
    }
    
    if(evento.name == 'email'){
        if(!mailformatRegex.test(evento.value)){
            console.log('El e-mail no es correcto');
            mostrarError(true, evento);
        }else{
            console.log('El e-mail es correcto');
            mostrarError(false, evento);
            errors.email = false;
        }
    }

    if(evento.name == 'telefono'){
        if(!telformatRegex.test(evento.value)){
            mostrarError(true, evento);
        }else{
            mostrarError(false, evento);
            errors.telefono = false;
        }
        
    }
} 
/* la funcion mostrarError(param, param) cambia la clase
de los inputs type (text, mail, tel) y si no han validado
les pone la clase mal y si han validado la clase bien */
mostrarError = (check, evento) => {

    if(check) {
        evento.classList.add('mal');
    }else {
        evento.classList.remove('mal');
        evento.classList.add('bien');
    }
};

/* La funcion checka(evento) se centra en los inputs 
radio y checkbox, si evento está checked llama a la
función poner checked en el html */
checka = (evento) => {
    if(evento.name == 'tamanio' || evento.name == 'ingrediente') {
        if(evento.checked){
            ponerCheck(true, evento);
        }else{
            ponerCheck(false, evento);
        }
    }
}

/* ponerCheck(param, param) tiene dos apartados
1.- en el radio:
    chequea que esté activo y si lo está, añade
    en el html el atributo checked, cambia el estado
    del errors.tamanio a false y habilita los inputs
    del checkbox 
    
2.- en el checkbox:
    si Se clicka sobre un input se añade su value a 
    un array auxiliar y si se vuelve a clicar sobre
    el mismo elemento, se eliminar esa posición del 
    array auxiliar

    cambia el estado de errors.ingrediente a false y
    llama a la función addControlador()
*/
ponerCheck = (check, evento) => {
    if(evento.name == 'tamanio'){
        let radio = document.getElementsByName('tamanio');
        if(check){
            for(let i=0; i<radio.length; i++) {
                if(radio[i].checked) {
                radio[i].toggleAttribute('checked', true);
                for(let j=i+1; j<radio.length; j++) {
                    radio[j].toggleAttribute('checked', false)
                }
                for(let j=i-1; j>0; j--) {
                    radio[j].toggleAttribute('checked', false);
                }
                errors.tamanio = false;
                tamanio = radio[i].value;
                let aux = document.getElementsByName('ingrediente');
                for(let z=0; z<aux.length; z++) {
                    aux[z].toggleAttribute('disabled', false);
                }
                break;
                }else{
                radio[i].toggleAttribute('checked', false);
                }
            }
        }
    }
    
    if(evento.name == 'ingrediente') {
        
        let cb = document.getElementsByName('ingrediente');
        for(let i=0; i<cb.length; i++) {
            if(check){
                if(evento.value == cb[i].value){
                    arrayAux.push(cb[i].value);
                }
            }else{
                for(let i=0; i<arrayAux.length; i++) {
                    if(arrayAux[i] == cb[i].value){
                        arrayAux.splice(i, 1);
                    }
                }
            }
        }

        if(arrayAux.length >= 2) {
            errors.ingrediente = false;
            addControlador();
        }
    }
}

/* Añade la fila del pedido al resumen */
añadirFila = () => {
    let mostrar;
    let precio;

    let texto = document.getElementById('tam');
    let texto2 = document.getElementById('ing');

    for(let clave in tam) {
        if(clave == tamanio) {
            mostrar = clave; 
            console.log(`mostrar aqui tiene el valor de ${mostrar}`);
            precio = tam[clave];
            console.log(`precio aqui tiene el valor de ${precio}`);
        }
    }

    texto.insertAdjacentHTML("afterbegin" ,`<p>${mostrar}</p>
                        <p>${precio} €</p>
                        <p id="item" class="item"><i class="far fa-times-circle"></i></p>`);
    
    arrayAux.forEach(element => {
        texto2.insertAdjacentHTML("afterbegin" ,`<div class="fila"><p>${element}</p>
                        <p>+ 1 €</p>
                        <p id="item" class="item"><i class="far fa-times-circle"></i></p></div>`);
    });
    pBase(precio, arrayAux);
}

pBase = (precio, arrayAux) => {

    let suma = precio + arrayAux.length;

    document.getElementById('pvp').insertAdjacentText('afterend', suma);

    pIva(suma);
}

pIva = (suma) => {

    let iva = suma * 0.21;

    document.getElementById('iva').insertAdjacentText('afterend', iva);

    pTotal(iva, suma);
}

pTotal = (iva, suma) => {
    let total = iva + suma;
    document.getElementById('ptotal').insertAdjacentText('afterend', total);
}

/* Zona controladores de submit y añadir fila */
addControlador = () => {
    if((errors.tamanio || errors.ingrediente)) {
        console.log('Algo esta fallando')
        buttonButton.toggleAttribute('disabled', true);
    }else {
        console.log('pues entra por donde debe');
        buttonButton.toggleAttribute('disabled', false);
        /* submitControlador(); */
    }
}

submitControlador = () => {
    console.log(errors);

    if((errors.nombre || errors.telefono || errors.email || errors.direccion)) {
        submitButton.toggleAttribute('disabled', true);
    }else {
        console.log('entro pq todo es false');
        submitButton.toggleAttribute('disabled', false);
    }
};


