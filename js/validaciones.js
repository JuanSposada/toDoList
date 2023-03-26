export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = "";

    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);

    }
}

const tipoDeErrores = [
    "valueMissing", "typeMismatch", "patternMismatch", "customError"
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",

    },
    email: {
        valueMissing: "Este campo email no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo contraseña no puede estar vacio",
        patternMismatch: "6-12 caracteres, debe contener una minuscula, una mayuscula, un numero y no caracteres expeciales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"

    },
    numero: {
        valueMissing: "Este campo de telefono no puede estar vacio",
        patternMismatch: "No letras, al menos 10 digitos"
    },
    direccion: {
        valueMissing: "Este campo de direccion no puede estar vacio",
        patternMismatch: "minimo 10 maximo 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo de ciudad no puede estar vacio",
        patternMismatch: "minimo 10 maximo 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo de estado no puede estar vacio",
        patternMismatch: "minimo 10 maximo 40 caracteres"
    }
}


const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        
        if(input.validity[error]){
            console.log(error)
            console.log(input.validity[error])
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"

    }
    
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}