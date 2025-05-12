// const form = document.getElementById("formulario");
    
// function getFormData() {
//     return {
//         tipoDoc: form.tipoDoc.value,
//         numDoc: form.numDoc.value,
//         nombre: form.nombre.value,
//         apellido: form.apellido.value,
//         nombreUsuario: form.nombreUsuario.value,
//         claveUsuario: form.claveUsuario.value,
//         correo: form.correo.value
//     };
// }

// function setFormData(data) {
//     form.tipoDoc.value = data.tipoDoc;
//     form.numDoc.value = data.numDoc;
//     form.nombre.value = data.nombre;
//     form.apellido.value = data.apellido;
//     form.nombreUsuario.value = data.nombreUsuario;
//     form.claveUsuario.value = data.claveUsuario;
//     form.correo.value = data.correo;
// }

// function guardar() {
//     fetch('/guardar', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(getFormData())
//     }).then(res => res.text())
//     .then(alert);
// }

// function buscar() {
//     const numDoc = form.numDoc.value;
//     fetch(`/usuario/${numDoc}`)
//     .then(res => {
//         if (!res.ok) throw new Error("Usuario no encontrado");
//         return res.json();
//     })
//     .then(data => {
//         if (data) setFormData(data);
//     })
//     .catch(err => alert(err.message));

// }

// function actualizar() {
//     fetch('/actualizar', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(getFormData())
//     }).then(res => res.text())
//     .then(alert);
// }

// function eliminar() {
//     const numDoc = form.numDoc.value;
//     fetch(`/eliminar/${numDoc}`, {
//         method: 'DELETE'
//     }).then(res => res.text())
//     .then(alert);
// }