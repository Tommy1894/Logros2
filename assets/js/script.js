// const usuario = require("../../models/usuario");

// function registrarUsuario(){
    
//     const formualario=document.getElementById('registro');
//     console.log("formualario")
//     const procesaTodo=(event)=>{
//         event.preventDefault();
//         const datos= new FormData(event.target);
//         const datosCompletos=Object.fromEntries(datos.entries());
//         const usuario=JSON.stringify(datosCompletos);
//         console.log(usuario);

//     }
// }

function cargarusuarios(){

    console.log("polla")
    var url = 'http://localhost:3000/gestionEstudiante.html/estudiantes';
    let datos={};

    fetch(url)
    .then(res => {return res.json();})
    .then(response => {response})
    .catch(error => console.error('Error:', error));

}

function registarUsuario(){

    let cedula1=document.getElementById("cedula").value;
    let nombre1=document.getElementById("nombre").value;
    let apellido1=document.getElementById("apellido").value;
    let direccion1=document.getElementById("direccion").value;
    let telefono1=document.getElementById("telefono").value;
    let sexo1="M";
    let fecha_nac1="2001-11-17";
    let correo1=document.getElementById("correo").value;
    let contraseña1=document.getElementById("password").value;
    let perfil1="E"
    let estado1="A";
    let intentos1=0;
    
    let mensaje={
        cedula:cedula1,
        nombre:nombre11,
        apellido:apellido1,
        direccion:direccion1,
        telefono:telefono1,
        sexo:sexo1,
        fecha_nac:fecha_nac1,
        correo:correo1,
        contraseña:contraseña1,
        perfil:perfil1,
        estado:estado1,
        intentos:intentos1
    }

    var url = 'http://localhost:3000/registro.htm';

    fetch(url,{
        method:'POST',
        body: JSON.stringify(mensaje),
        headers:{
            'Content-type' : 'application/json'
        }
    })
    .then(res => {return res.json();})
    .then(response => console.log(response))
    .catch(error => console.error('Error:', error));
}