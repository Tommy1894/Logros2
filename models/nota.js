const { DataTypes } = require("sequelize");

const sequelize = require("../db");

const Nota= sequelize.define('5nota',{
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER(10),
        autoIncrement:true   
    },
    nota:{
        type:DataTypes.FLOAT(3,1),
    }
}, 
{   
    
    createdAt:false,
    updatedAt:false
});


module.exports=Nota;