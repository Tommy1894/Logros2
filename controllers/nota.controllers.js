const Nota=require('../models/nota');
const Usuario=require('../models/usuario');
const Sequelize= require('sequelize');

//GETS

async function getNota(req, res){
    try{
        
        const notas=await Nota.findAll({

        });
        res.json(notas);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}
async function getNotaSeccion(req, res){
    try{
        const {id}=req.params;
        
        const notas=await Nota.findAll({
            
            include:{model:Usuario, as:'estudiante'},
            where:{seccion_id:id}
        });
        console.log(notas.estudiante.nombre);

        
        res.json(notas);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

async function getNotaEstudiante(req, res){
    try{
        const {cedula}=req.params;
        
        const notas=await Nota.findOne({
            include:Usuario,
            where:{est_cedula:cedula}
        });
        
        
        res.json(notas);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

//POST
async function createNotaEstudiante(req, res){
    try{

        const {nota,seccion_id, est_cedula}=req.body;
        
        const newNota=await Nota.create({
            nota,
            seccion_id,
            est_cedula
            
        },{
            fields: ['nota','seccion_id','est_cedula'],
        });
        return res.send(newNota);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

//PUT
async function updateNota(req,res){
    try {
        const {est_cedula} = req.params;
        const {nota,seccion_id} =req.body;

        const notas = await Nota.findOne({
            where:{
                seccion_id:seccion_id, est_cedula:est_cedula
            }
        });

        notas.nota = nota;
        await notas.save();
    
        res.json(notas);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}



module.exports={
    getNota,
    getNotaSeccion,
    getNotaEstudiante,
    createNotaEstudiante,
    updateNota,
    
}