const enviarCorreo = require('../controllers/correo.controllers');

const router=require('express').Router();


router.get('/correo/cedula=:value' , enviarCorreo )


module.exports=router;

