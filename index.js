const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan= require('morgan');
const app=express();
require('dotenv').config();
const PUERTO=process.env.PORT || 3000;

const whiteList=[];
app.use(cors({origen:whiteList}));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:true}));

app.use(express.static(__dirname + '/assets'));

const routerCur=require('./routers/curso/curso');
const routerUsu=require('./routers/usuario/usuario');
const routerSec=require("./routers/seccion/seccion");
const routerNot=require('./routers/notificacion/notificacion')
const routerCor=require('./routers/correo')
const routerNota=require('./routers/nota/nota');
const routerPDF= require('./routers/pdf');
const routerBDD= require('./routers/bdd');

const sequelize= require('./db');

sequelize.sync({force:false})
.then(()=>{
    console.log('*** Tablas sincronizadas ***');
})


//ENROTANDO 

app.use('/cursos', routerCur);
app.use('/usuarios', routerUsu)
app.use('/seccion', routerSec);
app.use('/notificacion', routerNot);
app.use('/notas', routerNota);
app.use(routerCor);
app.use(routerPDF);
app.use('/bdd', routerBDD);
app.listen(PUERTO, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
})
