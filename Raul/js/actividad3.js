
//comprobamos que los campos contiene datos o mostramos un mensaje
function vacios(){
    const inputs = document.getElementsByTagName('input') 
    let tamanioSelected = false // controlo que se selecciona un radio button para el tamaño
    let ingredientSelected = false // controlo que se selecciona un ingrediente al menos
    for(let element of inputs){
        switch(element.type){
            case ('text'):
            case ('tel'):
            case ('email'):
                if(element.value.trim() == '')
                    showSpan(element.name)   
                break
            case ('radio'):
                if(element.checked)
                    tamanioSelected = true
                break
            case('checkbox'):
                if(element.checked)
                    ingredientSelected = true
                break
                
        }
    }
    if(tamanioSelected == false)  
        showSpan(document.getElementById('tamanio').id)
    
    if(ingredientSelected == false)    
        showSpan(document.getElementById('ingredient').id)    
}

//muestra un span al lado del campo vacio en el formulario indicando que debe rellenarse
function showSpan(element){
    let aux = document.getElementById('span_'+`${element}`)
    aux.style.display = "inline"
}

function hideSpan(element){
    document.getElementById('span_'+`${element.id}`).style.display = "none"
}

//Validacion de campos nombre, telefono y email
const telf_re = /^[6|7|8|9][0-9]{8}$/
const nom_re =/^[A-Z]/
const mail_re=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
function validar(){
    //si el telefono no esta vacio y no cumple los requisitos muestra mensaje de error
    if(document.getElementById("telefono").value.trim() != ''){
        if(!telf_re.test(document.getElementById("telefono").value))
            showSpan("telefono_erroneo")
        else
        document.getElementById("span_telefono_erroneo").style.display = 'none'     
    }
    else
        document.getElementById("span_telefono_erroneo").style.display = 'none'     
    
    //si el nombre no empieza por mayúscula muestra mensaje de error
    if(document.getElementById("nombre").value.trim() != ''){
        if(!nom_re.test(document.getElementById("nombre").value))
            showSpan("nombre_erroneo")
        else
            document.getElementById("span_nombre_erroneo").style.display = 'none'     
    }
    else
        document.getElementById("span_nombre_erroneo").style.display = 'none'     
    
    
    //si el email no cumple los requisitos muestro un mensaje
    if(document.getElementById("email").value.trim() != ''){
        if(!mail_re.test(document.getElementById("email").value))
            showSpan("email_erroneo")
        else
            document.getElementById("span_email_erroneo").style.display = 'none'     
    }
    else
        document.getElementById("span_email_erroneo").style.display = 'none'     
}

//Calculo el precio total y lo muestro

const precioTamanio = []
precioTamanio.pequena = 5
precioTamanio.mediana = 10
precioTamanio.grande = 15

const precioIngrediente = 1

function precio(){
    let precioTotal = 0
    let tamanio = document.getElementsByName("tamanio")
    for(let element of tamanio){
        if(element.checked)
            precioTotal += precioTamanio[`${element.value}`]
    }
    for (let element of document.getElementsByName("ingredient"))
        if(element.checked){
            precioTotal += precioIngrediente
        }
    
    document.getElementById("precioTotal").textContent ="Precio total: " + precioTotal + "€"
}


window.onload= function(){

botonRealizaPedido.addEventListener("click", vacios)
botonRealizaPedido.addEventListener("click", validar)
botonRealizaPedido.addEventListener("click", precio)

//cuando se dejan vacios al validar el formulario 
//se muestra un mensaje a su lado indicando que deben rellenarse
//si hacemos focus en ellos para rellenarlos ocultamos ese mensaje

nombre.addEventListener("focus", 
    function(){
        document.getElementById("nombre").value = ''
        hideSpan(nombre)
    }
)

direccion.addEventListener("focus", 
    function(){
        hideSpan(direccion)
    }
)
telefono.addEventListener("focus", 
    function(){
        document.getElementById("telefono").value = ''
        hideSpan(telefono)
    }
)
email.addEventListener("focus", 
    function(){
        document.getElementById("email").value = ''
        hideSpan(email)
    }
)

//si algun tamaño tiene el focus oculto el mensaje "Debe seleccionar un tamaño"

pequena.addEventListener("focus",
function(){
    hideSpan(tamanio)
}
)
mediana.addEventListener("focus",
function(){
    hideSpan(tamanio)
}
)
grande.addEventListener("focus",
function(){
    hideSpan(tamanio)
}
)

//si algun ingrediente esta seleccionado oculto el mensaje "Debe elegir al menos un ingrediente"

pepperoni.addEventListener("focus",
function(){
    hideSpan(ingredient)
}
)
bacon.addEventListener("focus",
function(){
    hideSpan(ingredient)
}
)
cebolla.addEventListener("focus",
function(){
    hideSpan(ingredient)
}
)

pimiento.addEventListener("focus",
function(){
    hideSpan(ingredient)
}
)

}



//si quiero validar antes de enviar me creo una variable que sea true cuando todo este correcto y luego en el boton puedo poner un Evenlistener("click", enviar)
// function enviar(variable){
//     if (variable)
//         formulario.submit()
// }