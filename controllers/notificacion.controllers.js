const Usuario= require('../models/usuario');
const Notificacion= require('../models/notificacion');
const { Op } = require("sequelize");

async function getNotificacion(req, res){
    try{
        const notificaciones= await Notificacion.findAll();
        res.json(notificaciones);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

async function createNotificacion(req,res){
    try{
        const {numReferencia,nom_banco,ced_titular,seccion_id,monto,fecha_pago,est_cedula} =req.body;
        let newNotificacion= await Notificacion.create({
            numReferencia,
            nom_banco,
            ced_titular,
            seccion_id,
            monto,
            fecha_pago,
            est_cedula
        });
        return res.send(newNotificacion);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

async function getNotificacionFiltro(req, res){
    try{
        const notificacion= await Notificacion.findAll({
            where: {numReferencia:req.params.value},
        });
        res.json(notificacion);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

async function getNotificacionFecha(req, res){
    try{
        const notificacion= await Notificacion.findAll({
            where: {fecha_pago:req.params.value},
        });
        res.json(notificacion);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

async function getUsuarioNotificaciones(req, res) {
    const { cedula } = req.params;
    try {
      const notificaciones = await Notificacion.findAll({
        where: { est_cedula: cedula },
      });
      res.json(notificaciones);
    } 
    catch (e) {
      return res.status(500).json({ message: e.message });
    }
}

async function rechazarNotificacion(req, res){
    const { ref } = req.params;
    try {
      const notificacion = await Notificacion.findByPk(ref);
      notificacion.estado= "R";
      await notificacion.save();
      res.json(notificacion);
    } 
    catch (e) {
      return res.status(500).json({ message: e.message });
    }
} 

async function aprobarNotificacion(req, res){
    const { ref } = req.params;
    try {
      const notificacion = await Notificacion.findByPk(ref);
      notificacion.estado= "A";
      await notificacion.save();
      res.json(notificacion);
    } 
    catch (e) {
      return res.status(500).json({ message: e.message });
    }
} 
module.exports={
    getNotificacion,
    createNotificacion,
    getNotificacionFiltro,
    getNotificacionFecha,
    getUsuarioNotificaciones,
    rechazarNotificacion,
    aprobarNotificacion
}