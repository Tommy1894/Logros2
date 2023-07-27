const { getNotificacion, createNotificacion, getNotificacionFiltro, getNotificacionFecha, getUsuarioNotificaciones, rechazarNotificacion, aprobarNotificacion, FechaNotificacion } = require('../../controllers/notificacion.controllers');

const router=require('express').Router();


router.get('/',getNotificacion);
router.post('/',createNotificacion);
router.get('/filtro=:value',getNotificacionFiltro);
router.get('/fecha=:value', getNotificacionFecha);
router.get('/cedula=:cedula', getUsuarioNotificaciones);
router.get('/recha/num=:ref', rechazarNotificacion);
router.get('/apro/num=:ref', aprobarNotificacion);
router.put('/fecha/num=:ref', FechaNotificacion);
module.exports=router;