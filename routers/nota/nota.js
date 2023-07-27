const router=require('express').Router();
const {getNota,getNotaSeccion,getNotaEstudiante,createNotaEstudiante, updateNota}=require('../../controllers/nota.controllers');

router.get('/', getNota);
router.get('/seccion/filtro=:id', getNotaSeccion);
router.get('/estudiante/filtro=:cedula', getNotaEstudiante);

router.post('/', createNotaEstudiante);

router.put('/estudiante/filtro=:est_cedula', updateNota);




module.exports=router;