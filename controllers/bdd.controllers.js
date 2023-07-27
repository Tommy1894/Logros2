const mysqldump=require('mysqldump');
const moment = require('moment');
const fs=require('fs');

const sequelize = require("../db");

async function backup(req, res){    

    try{
        const name=`BackUp (${moment().format('DD_MM_YYYY')}).sql`;


        const datoUsu=await sequelize.query("Select * from 1usuarios" );
    
        var arrUsu=datoUsu[0];
        var result="";

        const usuario='INSERT INTO `1usuarios` (`cedula`,`nombre`, `apellido`, `direccion`, `telefono`, `sexo`, `fecha_nac`, `correo`, `contrasena`, `perfil`, `estado`, `intentos` ) VALUES ';

        for(let i=0; i<arrUsu.length;i++){

            result+=usuario+`('${arrUsu[i].cedula}', '${arrUsu[i].nombre}','${arrUsu[i].apellido}','${arrUsu[i].direccion}','${arrUsu[i].telefono}','${arrUsu[i].sexo}','${arrUsu[i].fecha_nac}','${arrUsu[i].correo}','${arrUsu[i].contrasena}','${arrUsu[i].perfil}','${arrUsu[i].estado}',${arrUsu[i].intentos});\n`

        }
        result+="\n\n";



        const datoCur=await sequelize.query("Select * from 2cursos" );
    
        var arrCur=datoCur[0];

        const curso='INSERT INTO `2cursos` (`id`, `nombre`, `costo`, `descripcion`, `estado`) VALUES';

        for(let i=0; i<arrCur.length;i++){

            result+=curso+`(${arrCur[i].id},'${arrCur[i].nombre}',${arrCur[i].costo},'${arrCur[i].descripcion}','${arrCur[i].estado}');\n`;

        }
        result+="\n\n";


        const datoNot=await sequelize.query("Select * from 3notificacions" );
    
        var arrNot=datoNot[0];

        const notificacion='INSERT INTO `3notificacions` (`numReferencia`,`nom_banco`,`ced_titular`,`seccion_id`,`monto`,`estado`,`fecha_pago`,`fecha_procesada`,`est_cedula`) VALUES ';

        for(let i=0; i<arrNot.length;i++){

            result+=notificacion+`('${arrNot[i].numReferencia}','${arrNot[i].nom_banco}','${arrNot[i].ced_titular}','${arrNot[i].seccion_id}',${arrNot[i].monto},'${arrNot[i].estado}','${arrNot[i].fecha_pago}','${arrNot[i].fecha_procesada}','${arrNot[i].est_cedula}');\n`;

        }
        result+="\n\n";


        const datoSec=await sequelize.query("Select * from 4seccions" );
    
        var arrSec=datoSec[0];

        const seccion='INSERT INTO `4seccions` (`id`,`modalidad`,`fecha_inicio`,`fecha_finalizacion`,`hora_inicio`,`hora_finalizacion`,`cupo_actual`,`cupo_maximo`,`estado`,`curso_id`,`prof_cedula`) VALUES ';

        for(let i=0; i<arrSec.length;i++){

            result+=seccion+`('${arrSec[i].id}','${arrSec[i].modalidad}','${arrSec[i].fecha_inicio}','${arrSec[i].fecha_finalizacion}','${arrSec[i].hora_inicio}','${arrSec[i].hora_finalizacion}',${arrSec[i].cupo_actual},${arrSec[i].cupo_maximo},'${arrSec[i].estado}','${arrSec[i].curso_id}','${arrSec[i].prof_cedula}');\n`;

        }
        result+="\n\n";


        const datoNotas=await sequelize.query("Select * from 5nota" );
    
        var arrNotas=datoNotas[0];

        const nota='INSERT INTO `5nota` (`id`, `nota`, `seccion_id`, `est_cedula`) VALUES ';

        for(let i=0; i<arrNotas.length;i++){

            result+=nota+`(${arrNotas[i].id},${arrNotas[i].nota},'${arrNotas[i].seccion_id}','${arrNotas[i].est_cedula}');\n`;

        }
        result+="\n\n";



        const Stream=res.writeHead(200, {
            'Content-Type':'application/sql',
            'Content-Disposition': `attachment;filename=${name}`
        })

        Stream.end(result);
       
    }catch(err){
        res.send(err)
    }
}


async function restore(req, res){    

    try{
        const {url}=req.body;

        if(url.substring((url.length-4), url.length)==".sql"){
            const text=fs.readFileSync(url).toString()
            const queries=text.split(';');

            for(let i=0; i<queries.length; i++){
                
                let newQuery="";
                let bool=false;
            
                for(let j=0;j<queries[i].length;j++){

                    if(queries[i].substring(j,j+7)=='TRIGGER'){break}
            
                    if(queries[i].substring(j, j+6)=='INSERT'){

                        let str1=queries[i].substring(j+7, queries[i].length);
            
                        newQuery="INSERT IGNORE "+str1
                        bool=true;
                    }
                }
                
                if(bool){
                    console.log(newQuery)
                   await sequelize.query(newQuery);
                }   
            }

            res.send(true);

        }else{
            res.send(false);
        }

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    } 
}

module.exports={
    backup,
    restore
}