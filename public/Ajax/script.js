//variable para obtener la información del formulario
const form = document.getElementById("formulario");

//Función que devuelve el valor de las variables
function getFormData() {
    return {
        tipoDoc: form.tipoDoc.value,
        numDoc: form.numDoc.value,
        nombre: form.nombre.value,
        apellido: form.apellido.value,
        nombreUsuario: form.nombreUsuario.value,
        correo: form.correo.value
    };
}

function setFormData(data) {
    form.tipoDoc.value = data.tipoDoc;
    form.numDoc.value = data.numDoc;
    form.nombre.value = data.nombre;
    form.apellido.value = data.apellido;
    form.nombreUsuario.value = data.nombreUsuario;
    form.correo.value = data.correo;
}
//Función para guardar la información por medio del metodo POST, espera un objeto JSON
function guardar() {
    fetch('/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getFormData())
    }).then(res => res.text())
      .then(alert);
}
//Función para buscar la información por medio del metodo GET, espera un objeto JSON
function buscar() {
    const numDoc = form.numDoc.value;
    console.log("Consultando:", `/usuarios/${numDoc}`);
    fetch(`/usuarios/${numDoc}`)
        .then(res => res.json())
        .then(data => {
            if (data) setFormData(data);
            else alert("Usuario no encontrado");
        });
}
//Función para actualizar la información por medio del metodo PUT, espera un objeto JSON
function actualizar() {
    fetch('/actualizar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getFormData())
    }).then(res => res.text())
    .then(alert);
}
//Función para eliminar la información por medio del metodo DELETE, espera un objeto JSON
function eliminar() {
    const numDoc = form.numDoc.value;
    fetch(`/eliminar/${numDoc}`, {
        method: 'DELETE'
    }).then(res => res.text())
    .then(alert);
}
