const router=require('express').Router();
const {getSeccion,getSeccionFiltroId,getSeccionFiltroFech,getSeccionFiltroCurs,getSeccionFiltroProf,createSeccion,updateSeccion,deleteSeccion}=require('../../controllers/seccion.controllers');

router.get('/' , getSeccion);
router.get('/id/filtro=:value', getSeccionFiltroId);
router.get('/fecha/filtro=:value', getSeccionFiltroFech);
router.get('/curso/filtro=:value', getSeccionFiltroCurs);
router.get('/profesor/filtro=:value', getSeccionFiltroProf);

router.post('/' , createSeccion);

router.put('/filtro=:id' , updateSeccion);

router.delete('/filtro=:id' , deleteSeccion);


module.exports=router;