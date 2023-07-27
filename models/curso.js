const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Seccion = require("./seccion");

const Curso= sequelize.define('2curso',{
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER(10),
        autoIncrement:true   
    },
    nombre:{
        type:DataTypes.STRING(45),
        allowNull:false
    },
    costo:{
        type:DataTypes.FLOAT(12,2),
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.ENUM('A','I'),
        allowNull:false
    }
}, 
{
    createdAt:false,
    updatedAt:false
});

Curso.hasMany(Seccion, {foreignKey:{
    name:"curso_id",
    allowNull:false
}});
Seccion.belongsTo(Curso, {as:'curso',foreignKey:{
    name:"curso_id",
    allowNull:false
}});

module.exports=Curso;