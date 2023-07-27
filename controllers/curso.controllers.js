const Curso= require('../models/curso');
const { Op } = require("sequelize");

//GETS
async function getCurso(req, res){
    try{
        const cursos=await Curso.findAll();
        res.json(cursos);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

async function getCursoFiltro(req, res){
    try{
        const cursos=await Curso.findAll({
            where:{
                [Op.or]: [
                    {nombre:req.params.value},
                    {id:req.params.value}
                ]
            }
        });
        res.json(cursos);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

async function getCursoActivos(req, res){
    try{
        const cursos=await Curso.findAll({
            where :{estado:'A'}
        });
        res.json(cursos);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

async function getCursoActivosFiltro(req, res){
    try{
        const cursos=await Curso.findAll({
            where:{
                [Op.or]: [
                    {nombre:req.params.value, estado:'A'},
                    {id:req.params.value, estado:'A'}
                ]
            }
        });
        res.json(cursos);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}

// POST
async function createCurso(req,res){
    try{
        const {id,nombre,costo,descripcion,estado} =req.body;
        let newCurso= await Curso.create({
            id,
            nombre,
            costo,
            descripcion,
            estado,

        },{
            fields: ["id","nombre","costo","descripcion","estado"],
        });
        return res.send(newCurso);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

//PUT
async function updateCurso(req,res){
    try {
        const { id } = req.params;
        const { nombre,costo,descripcion,estado} = req.body;
        
        const curso = await Curso.findByPk(id);
        curso.nombre = nombre;
        curso.costo = costo;
        curso.descripcion = descripcion;
        curso.estado = estado;
        await curso.save();
    
        res.json(curso);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

async function deleteCurso(req,res){
    try {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);
        curso.estado = "I";
        await curso.save();
    
        res.json(curso);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
} 

module.exports={
    getCurso,
    getCursoFiltro,
    getCursoActivos,
    getCursoActivosFiltro,
    createCurso,
    updateCurso,
    deleteCurso
}