const {getUsuarios,getUsuariosFiltro,
    getEstudiantes,getEstudiantesFiltro,
    getProfesores,getProfesoresFiltro,
    getAdministradores, getAdministradoresFiltro,
    createEstudiante,createProfesor,createAdministrador,
    updateUsuario,updateAmdiminstrador,
    deleteUsuario,
    intentosUsuario} = require('../../controllers/usuario.controllers');

const router=require('express').Router();

//GETS
router.get('/', getUsuarios);  
router.get('/filtro=:value', getUsuariosFiltro);
router.get('/estudiantes', getEstudiantes);
router.get('/estudiantes/filtro=:value', getEstudiantesFiltro);
router.get('/profesores', getProfesores);
router.get('/profesores/filtro=:value', getProfesoresFiltro);
router.get('/administradores', getAdministradores);
router.get('/administradores/filtro=:value', getAdministradoresFiltro);
router.get('/intentos/cedula=:cedula', intentosUsuario);

//POST
router.post('/estudiantes', createEstudiante);
router.post('/profesores', createProfesor);
router.post('/administradores', createAdministrador);


//PUT
router.put('/filtro=:cedula',updateUsuario); //Modificacion para cualquier usuario
router.put('/administradores/filtro=:cedula',updateAmdiminstrador); //Modificacion para la gestion del admin (incluye el estado del usuario)


//DELETE
router.delete('/filtro=:cedula', deleteUsuario);  //Usuario inactivo

module.exports=router;