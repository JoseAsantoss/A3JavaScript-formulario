function validarCampo(){
        let ok = true;

        if(nombre.value.trim()== ""){
            document.getElementById("nombre").placeholder="Campo obligatorio";           
            document.getElementById("nombre").classList.add("error");
            ok = false;
        }
        
        if(direccion.value.trim()== "") {
            document.getElementById("direccion").placeholder="Campo obligatorio";
            document.getElementById("direccion").classList.add("error");

            ok = false;
        }
        if(tel.value.trim()== "") {
            document.getElementById("tel").placeholder="Campo obligatorio";
            document.getElementById("tel").classList.add("error");
            ok = false;
        }
        if(email.value.trim()== "") {
            document.getElementById("email").placeholder="Campo obligatorio";
            document.getElementById("email").classList.add("error");
            ok = false;
        }
        return ok;

    }

    // input pierda focus o keyup
    const validaNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/gi;
    if(!validaNombre.test(document.getElementById("nombre").value)){
        //alert("El nombre tiene que empezar con Mayúscula")
    }


// Validamos que haya un radio seleccionado
function validarRadio(){
    let radio = document.getElementsByName("size")
    let seleccionado = false;
    console.log(radio.length);

    for(var i=0; i<radio.length; i++){
        console.log(`Tamaño: ${radio[i].value} Seleccionado: ${radio[i].checked}`);
        if(radio[i].checked){
            seleccionado = true;
            document.getElementById("tamanoPizza").classList.remove("error");
            //break;
        }
    }    
    if(!seleccionado){
            console.log(`aqui no entro ${seleccionado}`);
            alert('Por favor. Selecciona un tamaño de pizza')
            document.getElementById("tamanoPizza").classList.add("error");
            return false
        }    
    
    /*else{
            document.getElementById("tamanoPizza").classList.add("error");
            alert('Por favor. Selecciona un tamaño de pizza')
            return false
        }*/
}

// Validamos que haya un checked seleccionado
function validarChecked(){
    let ingredienteCheck = document.getElementsByName("ingredient")
    let valor = 0;
    var NoSeleccionado = false
    console.log(ingredienteCheck);
    for(var i=0; i<ingredienteCheck.length; i++) {
        console.log(`Ingrediente: ${ingredienteCheck[i].value} Seleccionado: ${ingredienteCheck[i].checked}`);
        if(ingredienteCheck[i].checked){
            valor++
            document.getElementById("ingredientes").classList.remove("error");
            //break;
        }
    }
    if(valor < 1){
        alert('Por favor. Selecciona al menos un ingrediente')
        document.getElementById("ingredientes").classList.add("error");
        console.log("Valor: " + valor +  ` y no seleccionado: ${NoSeleccionado}`);
    }
        /*if(!NoSeleccionado){
            document.getElementById("ingredientes").classList.add("error");
            return false
        }else{
            // document.getElementById("ingredientes").style="background-color: var(--color-principal);";
            //document.getElementById("ingredientes").classList.remove("error");
            console.log("Estoy aquí " + valor);
            break;
        }*/

}





// obtenemos los importes
function importe(){
    let importeMasa = 0
    let importeIngredientes = 0
    let importeTotal
    let element = document.getElementsByName("size")
    console.log(element)

    for(var i=0; i<element.length; i++) {       
        if(element[i].checked){
            if(element[i].value == "small"){
                importeMasa += 5;
                // console.log(`IMPORTE1 ${importeMasa}`)
            } else if(element[i].value == "medium") {
                importeMasa += 10;
                // console.log(`IMPORTE2 ${importeMasa}`)
            }else{
                importeMasa += 15;
                // console.log(`IMPORTE3 ${importeMasa}`)
            }
            break;
        }
    }

    let ingrediente = document.getElementsByName("ingredient")
    for(var i=0; i<ingrediente.length; i++){
       if(ingrediente[i].checked){
           ++importeIngredientes
        }
        //console.log(importeIngredientes)
    }
    document.getElementById("importe_masa").textContent =`Importe de la masa: ${importeMasa} €`
    document.getElementById("importe_ingrediente").textContent =`Importe de los ingredientes:   ${importeIngredientes} €`
    document.getElementById("importe_total").textContent =`Importe TOTAL:  ${importeMasa+importeIngredientes} €`
    //let importeTotal = `${importeMasa+importeIngredientes}`
    //document.getElementById("importe_total").textContent =`Importe TOTAL:  ${importeTotal} €`


}


window.onload = function() {
    let validacion= false;
    formulario.onsubmit = validacion;

    submit.onclick = function(e){
        if(!validarCampo()){
            e.preventDefault();
        }
    }   
    
    nombre.addEventListener("focus", 
        function(){
            document.getElementById("nombre").classList.remove("error");
            //document.getElementById("nombre").value = ''
            //document.getElementById("nombre").style="color: var(--color-principal); background-color: var(--color-white);";
            document.getElementById("nombre").placeholder="Nombre";
        }
    )
    direccion.addEventListener("focus", 
        function(){
            document.getElementById("direccion").value = ''
            document.getElementById("direccion").style="color: var(--color-principal); background-color: var(--color-white);";
            document.getElementById("direccion").placeholder="Dirección";
        }
    )
    tel.addEventListener("focus", 
        function(){
            document.getElementById("tel").value = ''
            document.getElementById("tel").style="color: var(--color-principal); background-color: var(--color-white);";
            document.getElementById("tel").placeholder="Teléfono";
        }
    )
    email.addEventListener("focus", 
        function(){
            document.getElementById("email").value = ''
            document.getElementById("email").style="color: var(--color-principal); background-color: var(--color-white);";
            document.getElementById("email").placeholder="E-mail";
        }
    )


    tamanoPizza.addEventListener("click", validarRadio)
    ingredientes.addEventListener("click", validarChecked)
    

    /*submit.addEventListener("click", validarRadio)
    submit.addEventListener("click", validarChecked)
    submit.addEventListener("click", importe)
    */
    submit.addEventListener("click", 
    () => {
        validarRadio()
        validarChecked()
        importe()
        }
    )   
    reset.addEventListener("click", 
    () => {
        document.getElementById("nombre").classList.remove("error");
        document.getElementById("nombre").placeholder="Nombre";
        document.getElementById("direccion").classList.remove("error");
        document.getElementById("direccion").placeholder="Dirección";
        document.getElementById("tel").classList.remove("error");
        document.getElementById("tel").placeholder="Teléfono";
        document.getElementById("email").classList.remove("error");
        document.getElementById("email").placeholder="E-mail";

        document.getElementById("tamanoPizza").classList.remove("error");

        document.getElementById("ingredientes").classList.remove("error");
        importe()
        }
    )   



};

/* getElementsByTagName */