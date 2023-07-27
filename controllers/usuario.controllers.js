const Usuario= require('../models/usuario');
const { Op } = require("sequelize");


//GETS
async function getUsuarios(req, res){
    try{
        const usuarios= await Usuario.findAll();
        res.json(usuarios);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

async function getUsuariosFiltro(req, res){
    try{
        const usuarios= await Usuario.findAll({
            where:{
                [Op.or]: [
                    {cedula:req.params.value},
                    {nombre:req.params.value},
                    {apellido:req.params.value}
                ]
            }
        });
        res.json(usuarios);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

async function getEstudiantes(req, res){
    try{
        const estudiantes= await Usuario.findAll({
            where:{ perfil: 'E'}
        });
        res.json(estudiantes);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

async function getEstudiantesFiltro(req, res){
    try{
        const estudiantes= await Usuario.findAll({
            where:{
                [Op.or]: [
                    {cedula:req.params.value},
                    {nombre:req.params.value},
                    {apellido:req.params.value}
                ],
                [Op.and]:[
                    {perfil:'E'}
                ]
            }
        });
        res.json(estudiantes);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

async function getProfesores(req, res){
    try{
        const profesores= await Usuario.findAll({
            where:{ perfil: 'P'}
        });
        res.json(profesores);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

async function getProfesoresFiltro(req, res){
    try{
        const profesores= await Usuario.findAll({
            where:{
                [Op.or]: [
                    {cedula:req.params.value},
                    {nombre:req.params.value},
                    {apellido:req.params.value}
                ],
                [Op.and]:[
                    {perfil:'P'}
                ]
            }
        });
        res.json(profesores);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

async function getAdministradores(req, res){
    try{
        const administradores= await Usuario.findAll({
            where:{ perfil: 'A'}
        });
        res.json(administradores);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

async function getAdministradoresFiltro(req, res){
    try{
        const administradores= await Usuario.findAll({
            where:{
                [Op.or]: [
                    {cedula:req.params.value},
                    {nombre:req.params.value},
                    {apellido:req.params.value}
                ],
                [Op.and]:[
                    {perfil:'A'}
                ]
            }
        });
        res.json(administradores);
    }catch (error){
    res.status(500).json({
        message: error.message
    });
    }  
}

//POSTS
async function createEstudiante(req,res){
    try{
        const {cedula,nombre,apellido,direccion,telefono,sexo,fecha_nac,correo,contrasena} =req.body;
        let newEstudiante= await Usuario.create({
            cedula,
            nombre,
            apellido,
            direccion,
            telefono,
            sexo,
            fecha_nac,
            correo,
            contrasena,
            perfil: "E"
        },{
            fields: ["cedula","nombre","apellido","direccion","telefono","sexo","fecha_nac","correo","contrasena","perfil"],
        });
        return res.send(newEstudiante);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

async function createProfesor(req,res){
    try{
        const {cedula,nombre,apellido,direccion,telefono,sexo,fecha_nac,correo,contrasena} =req.body;
        let newProfesor= await Usuario.create({
            cedula,
            nombre,
            apellido,
            direccion,
            telefono,
            sexo,
            fecha_nac,
            correo,
            contrasena,
            perfil: "P"
        },{
            fields: ["cedula","nombre","apellido","direccion","telefono","sexo","fecha_nac","correo","contrasena","perfil"],
        });
        return res.send(newProfesor);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

async function createAdministrador(req,res){
    try{
        const {cedula,nombre,apellido,direccion,telefono,sexo,fecha_nac,correo,contrasena} =req.body;
        let newAdministrador= await Usuario.create({
            cedula,
            nombre,
            apellido,
            direccion,
            telefono,
            sexo,
            fecha_nac,
            correo,
            contrasena,
            perfil: "A"
        },{
            fields: ["cedula","nombre","apellido","direccion","telefono","sexo","fecha_nac","correo","contrasena","perfil"],
        });
        return res.send(newAdministrador);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

//PUTS
async function updateUsuario(req,res){
    try {
        const { cedula } = req.params;
        const { nombre,apellido,direccion,telefono,sexo,fecha_nac,correo,contrasena,estado } = req.body;
        
        const usuario = await Usuario.findByPk(cedula);
        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.direccion = direccion;
        usuario.telefono = telefono;
        usuario.sexo = sexo;
        usuario.fecha_nac = fecha_nac;
        usuario.correo = correo;
        usuario.contrasena = contrasena;
        usuario.estado = estado;
        await usuario.save();
    
        res.json(usuario);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

async function updateAmdiminstrador(req,res){
    try {
        const { cedula } = req.params;
        const { nombre,apellido,direccion,telefono,sexo,fecha_nac,correo,contrasena, estado} = req.body;
        
        const admin = await Usuario.findByPk(cedula);
        admin.nombre = nombre;
        admin.apellido = apellido;
        admin.direccion = direccion;
        admin.telefono = telefono;
        admin.sexo = sexo;
        admin.fecha_nac = fecha_nac;
        admin.correo = correo;
        admin.contrasena = contrasena;
        admin.estado = estado;
        await admin.save();
    
        res.json(admin);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

//DELETES
async function deleteUsuario(req,res){
    try {
        const { cedula } = req.params;
        const usuario = await Usuario.findByPk(cedula);
        usuario.estado = "I";
        await usuario.save();
    
        res.json(usuario);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
} 

async function intentosUsuario(req, res){
    try {
        const { cedula } = req.params;
        const usuario = await Usuario.findByPk(cedula);
        usuario.intentos = usuario.intentos+1;
        if (usuario.intentos==3){
            usuario.estado="B";
        }
        await usuario.save();
    
        res.json(usuario);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}
module.exports={
    getUsuarios,
    getUsuariosFiltro,
    getEstudiantes,
    getEstudiantesFiltro,
    getProfesores,
    getProfesoresFiltro,
    getAdministradores,
    getAdministradoresFiltro,
    createEstudiante,
    createProfesor,
    createAdministrador,
    updateUsuario,
    updateAmdiminstrador,
    deleteUsuario,
    intentosUsuario
};