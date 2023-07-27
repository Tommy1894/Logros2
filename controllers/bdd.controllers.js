const mysqldump=require('mysqldump');
const moment = require('moment')
const fs=require('fs');
const raiz=require('../backup/raiz');

const sequelize = require("../db");

const DB_HOST=process.env.DB_HOST || "localhost";
const DB_USER=process.env.DB_USER || "root";
const DB_PASSWORD=process.env.DB_PASSWORD|| "";
const DB_DATABASE=process.env.DB_DATABASE || "mydb";

async function backup(req, res){    

    const name=`BackUp (${moment().format('DD_MM_YYYY')}).sql`;
    const filePath=raiz +'/'+name;

    await mysqldump({
        connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        },
        dumpToFile: filePath
        
    });

    const Stream=res.writeHead(200, {
        'Content-Type':'application/sql',
        'Content-Disposition': `attachment;filename=${name}`
    })

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(Stream);

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