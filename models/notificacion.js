const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Notificacion = sequelize.define('3notificacion',{
    numReferencia:{
        type: DataTypes.STRING(30),
        primaryKey:true
    },
    nom_banco:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    ced_titular:{
        type:DataTypes.STRING(15),
        allowNull:false
    },
    seccion_id:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    monto:{
        type:DataTypes.FLOAT(12,2),
        allowNull:false
    },
    estado:{
        type:DataTypes.ENUM('A', 'R', 'E'),
        defaultValue:'E',
        allowNull:false
    },
    fecha_pago:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    fecha_procesada:{
        type:DataTypes.DATEONLY,
        allowNull:true
    },
}, 
{
    createdAt:false,
    updatedAt:false
});

module.exports= Notificacion;