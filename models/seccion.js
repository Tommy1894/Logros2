const { DataTypes } = require("sequelize");

const sequelize = require("../db");
const Nota= require('./nota');

const Seccion= sequelize.define('4seccion',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey:true
        
    },
    modalidad:{
        type:DataTypes.ENUM('I','S'),
        allowNull:false
    },
    fecha_inicio:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    fecha_finalizacion:{
        type:DataTypes.DATEONLY
    },
    hora_inicio:{
        type:DataTypes.TIME,
        allowNull:false
        
    },
    hora_finalizacion:{
        type:DataTypes.TIME,
        allowNull:false
    },
    cupo_actual:{
        type:DataTypes.INTEGER(2),
        allowNull:false
    },
    cupo_maximo:{
        type:DataTypes.INTEGER(2),
        allowNull:false
    },
    estado:{
        type:DataTypes.ENUM('A', 'I'),
        allowNull:false,
        defaultValue:"A"
    }
}, 
{
    createdAt:false,
    updatedAt:false
});

Seccion.hasOne(Nota, {foreignKey:{
    name:"seccion_id",
    allowNull:false
}});

Nota.belongsTo(Seccion, {foreignKey:{
    name:"seccion_id",
    allowNull:false
}});
module.exports=Seccion;