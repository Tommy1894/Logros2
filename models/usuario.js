const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const Notificacion= require("./notificacion");
const Nota = require("./nota");
const Seccion=require("./seccion")


const Usuario= sequelize.define('1usuario',{
    cedula:{
        type: DataTypes.STRING(13),
        primaryKey:true,
        
    },
    nombre:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    direccion:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    telefono:{
        type:DataTypes.STRING(11),
        allowNull:false
    },
    sexo:{
        type:DataTypes.ENUM('M', 'F'),
        allowNull:false
    },
    fecha_nac:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    correo:{
        type:DataTypes.STRING(40),
        allowNull:false,
        unique: true
    },
    contrasena:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    perfil:{
        type:DataTypes.ENUM('E','P','A'),
        allowNull:false
    },
    estado:{
        type:DataTypes.ENUM('A','I','B'),
        allowNull:false,
        defaultValue:"A"
    },
    intentos:{
        type:DataTypes.INTEGER(2),
        defaultValue:0,
        allowNull:false
    
    },
}, 
{
    createdAt:false,
    updatedAt:false
});

Usuario.hasMany(Notificacion, {foreignKey:{
    name:"est_cedula",
    allowNull:false
}});
Usuario.hasMany(Nota, {foreignKey:{
    name:"est_cedula",
    allowNull:false
}});
Usuario.hasMany(Seccion, {foreignKey:{
    name:"prof_cedula",
    allowNull:false
}});

Notificacion.belongsTo(Usuario, {foreignKey:{
    name:"est_cedula",
    allowNull:false
}});

Seccion.belongsTo(Usuario, {as:'profesor',foreignKey:{
    name:"prof_cedula",
    allowNull:false
}});

Nota.belongsTo(Usuario, {as:'estudiante',foreignKey:{
    name:"est_cedula",
    allowNull:false
}});

module.exports=Usuario;