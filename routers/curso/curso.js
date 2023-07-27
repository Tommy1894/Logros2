const router=require('express').Router();
const {getCurso, getCursoFiltro, getCursoActivos, getCursoActivosFiltro, createCurso, updateCurso, deleteCurso} = require('../../controllers/curso.controllers');


router.get('/', getCurso);
router.get('/filtro=:value', getCursoFiltro);
router.get('/activos', getCursoActivos)
router.get('/activos/filtro=:value', getCursoActivosFiltro);
router.post('/', createCurso);
router.put('/filtro=:id', updateCurso);
router.delete('/filtro=:id', deleteCurso);


module.exports=router