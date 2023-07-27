const Nota = require('../models/nota');
const Seccion= require('../models/seccion');
const { Op } = require("sequelize");
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');

//GETS
async function getSeccion(req, res){
    try{
        const secciones=await Seccion.findAll();
        res.json(secciones);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

async function getSeccionFiltroId(req, res){
    try{
        const secciones=await Seccion.findByPk(req.params.value,{
            include:[{model:Usuario, as:'profesor'},{model:Curso, as: 'curso'}]
        });
        console.log(secciones.profesor.nombre);
        console.log(secciones.curso.costo);
        res.json(secciones);
        
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

async function getSeccionFiltroFech(req, res){
    try{
        const secciones=await Seccion.findAll({
            where:{
                fecha_inicio:req.params.value
            }
        });
        
        res.json(secciones);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

async function getSeccionFiltroCurs(req, res){
    try{
        const secciones=await Seccion.findAll({
                where:{
                    curso_id:req.params.value
                }
            });
                    

        res.json(secciones);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

async function getSeccionFiltroProf(req, res){
    try{
        const secciones=await Seccion.findAll({
            where:{
                prof_cedula:req.params.value
            }
        });
        res.json(secciones);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}


//POST
async function createSeccion(req,res){
    try{
        const {id,modalidad,fecha_inicio,fecha_finalizacion,hora_inicio,hora_finalizacion,cupo_actual,cupo_maximo,curso_id,prof_cedula} =req.body;
        let newSeccion= await Seccion.create({
            id,
            modalidad,
            fecha_inicio,
            fecha_finalizacion,
            hora_inicio,
            hora_finalizacion,
            cupo_actual,
            cupo_maximo,
            curso_id,
            prof_cedula,
        },{
            fields: ["id","modalidad","fecha_inicio","fecha_finalizacion","hora_inicio","hora_finalizacion","cupo_actual","cupo_maximo","curso_id","prof_cedula"],
        });
        return res.send(newSeccion);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}


//PUT
async function updateSeccion(req,res){
    try {
        const { id } = req.params;
        const {modalidad,fecha_inicio,fecha_finalizacion,hora_inicio,hora_finalizacion,cupo_actual,cupo_maximo,estado,curso_id,prof_cedula} =req.body;
        
        const seccion = await Seccion.findByPk(id);
        seccion.modalidad = modalidad;
        seccion.fecha_inicio = fecha_inicio;
        seccion.fecha_finalizacion = fecha_finalizacion;
        seccion.hora_inicio = hora_inicio;
        seccion.hora_finalizacion = hora_finalizacion;
        seccion.cupo_actual = cupo_actual;
        seccion.cupo_maximo = cupo_maximo;
        seccion.estado = estado;
        seccion.curso_id = curso_id;
        seccion.prof_cedula = prof_cedula;

        await seccion.save();
    
        res.json(seccion);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

//DELETE
async function deleteSeccion(req,res){
    try {
        const { id } = req.params;
        const seccion = await Seccion.findByPk(id);
        seccion.estado = "I";
        await seccion.save();
    
        res.json(seccion);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
} 


module.exports={
    getSeccion,
    getSeccionFiltroId,
    getSeccionFiltroFech,
    getSeccionFiltroCurs,
    getSeccionFiltroProf,
    createSeccion,
    updateSeccion,
    deleteSeccion
}