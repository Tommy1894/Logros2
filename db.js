const Sequelize= require('sequelize');
require('dotenv').config();

const DB_HOST=process.env.DB_HOST || "localhost"
const DB_PORT=process.env.DB_PORT || 3306
const DB_USER=process.env.DB_USER || "root"
const DB_PASSWORD=process.env.DB_PASSWORD|| ""
const DB_DATABASE=process.env.DB_DATABASE || "mydb"



//Definimos los parametros de conexion

const sequelize=new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD,{
    host:DB_HOST,
    port:DB_PORT,
    dialect:'mysql',
    dialectOptions:{
      connectTimeout:10000
    }
});

//TRIGGERS
// sequelize.query("CREATE TRIGGER IF NOT EXISTS `registrar_matricula` AFTER UPDATE ON `notificacion de pagos` FOR EACH ROW BEGIN DECLARE idCurso VARCHAR(10); DECLARE idHorario VARCHAR(10); DECLARE random INT; IF new.estado='A' THEN SELECT FLOOR(1+ RAND() * (9999999999 -1)) INTO random; SELECT id INTO idCurso FROM cursos WHERE nombre=new.nom_curso; SELECT id INTO idHorario FROM horarios WHERE curso_id=idCurso AND modalidad=new.modalidad_curso; INSERT INTO matriculas(id,horario_id,est_cedula) VALUES(random, idHorario, new.est_cedula); END IF; END");


//TRIGGERS
// sequelize.query("CREATE TRIGGER `registrar_matricula` AFTER UPDATE ON `notificacion de pagos` FOR EACH ROW BEGIN DECLARE idCurso VARCHAR(10); DECLARE idHorario VARCHAR(10); DECLARE random INT; SELECT FLOOR(1+ RAND() * (9999999999 -1)) INTO random; IF new.estado='A' THEN SELECT idHorario INTO idCurso FROM cursos WHERE nombre=new.nom_curso; SELECT id INTO idHorario FROM horarios WHERE curso_id=idCurso AND modalidad=new.modalidad_curso; INSERT INTO matriculas(id,est_cedula,curso_id) VALUES(random, new.est_cedula, idHorario); END IF; END");
module.exports=sequelize;
