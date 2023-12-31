const PDFdocument = require("pdfkit-table");

const Usuario = require("../models/usuario");
const Nota = require("../models/nota");
const Seccion = require("../models/seccion");
const Curso = require("../models/curso");

async function PDFestudiante(callback, endcallback){
    
    const estudiantes= await Usuario.findAll({
        where:{ perfil: 'E'},
        order: [["nombre"]]
    });

    const doc= new PDFdocument({
        size:"LETTER",
        bufferPages:true,
        autoFirstPage:false,
        font:"Helvetica",
        fontSize:8
    })
    
    let pageNumber=0;
    doc.on('pageAdded',()=>{
        pageNumber++;

        let bottom =doc.page.margins.bottom;

        doc.page.margins.bottom =0;
        doc.font('Helvetica').fontSize(8)
        doc.text(
            'Pag. '+pageNumber,
            (doc.page.width - 100)*0.5,
            doc.page.height -50,
            {
                width:100,
                align: 'center',
                lineBreak:false,
            }
        )
        doc.page.margins.bottom=bottom;
    })

    doc.addPage();
    doc.font("Helvetica-Bold").fontSize(14);
    doc.text("Centro Educativo LOGROS", 50,30);
    doc.moveDown();
    
    const rowEstudiantes=[];

    estudiantes.forEach(element =>{
        if(element.estado==="B"){
            element.estado= "Bloqueado";
        }
        else if(element.estado==="A"){
            element.estado= "Activo";
        }
        else if(element.estado==="I"){
            element.estado= "Inactivo";
        }
        const temp_list=[element.cedula, element.nombre, element.apellido, element.correo,element.estado];
        rowEstudiantes.push(temp_list);
    })
    const table ={
        title: "Lista de estudiantes",
        headers: [
            {label:'Cédula',width:100},
            {label:'Nombre',width:100},
            {label:'Apellido',width:100},
            {label:'Correo',width:150},
            {label:'Estado',width:70}],
        rows: rowEstudiantes,
        font:"Courier",
        fontSize:16
    }

    doc.table(table,{
        width:600,
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: () => {
          doc.font("Helvetica").fontSize(8);}
    })
    doc.on('data', callback);
    doc.on('end', endcallback);
    doc.end();
}

async function PDFprofesor(callback, endcallback){
    
    const profesores= await Usuario.findAll({
        where:{ perfil: 'P'},
        order: [["nombre"]]
    });

    const doc= new PDFdocument({
        size:"LETTER",
        bufferPages:true,
        autoFirstPage:false,
        font:"Helvetica",
        fontSize:8
    })
    
    let pageNumber=0;
    doc.on('pageAdded',()=>{
        pageNumber++;

        let bottom =doc.page.margins.bottom;

        doc.page.margins.bottom =0;
        doc.font('Helvetica').fontSize(8)
        doc.text(
            'Pag. '+pageNumber,
            (doc.page.width - 100)*0.5,
            doc.page.height -50,
            {
                width:100,
                align: 'center',
                lineBreak:false,
            }
        )
        doc.page.margins.bottom=bottom;
    })

    doc.addPage();
    doc.font("Helvetica-Bold").fontSize(14);
    doc.text("Centro Educativo LOGROS", 50,30);
    doc.moveDown();
    
    const rowProfesores=[];

    profesores.forEach(element =>{
        if(element.estado==="B"){
            element.estado= "Bloqueado";
        }
        else if(element.estado==="A"){
            element.estado= "Activo";
        }
        else if(element.estado==="I"){
            element.estado= "Inactivo";
        }
        const temp_list=[element.cedula, element.nombre, element.apellido, element.correo,element.estado];
        rowProfesores.push(temp_list);
    })
    const table ={
        title: "Lista de profesores",
        headers: [
            {label:'Cédula',width:100},
            {label:'Nombre',width:100},
            {label:'Apellido',width:100},
            {label:'Correo',width:150},
            {label:'Estado',width:70}],
        rows: rowProfesores,
        font:"Courier",
        fontSize:16
    }

    doc.table(table,{
        width:600,
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: () => {
          doc.font("Helvetica").fontSize(8);}
    })
    doc.on('data', callback);
    doc.on('end', endcallback);
    doc.end();
}

async function PDFnota(callback, endcallback, id){
    
    const notas=await Nota.findAll({
        include:{model:Usuario, as:'estudiante'},
        where:{seccion_id:id},
        order:[[{model: Usuario, as:'estudiante'}, 'nombre']]
    });

    const seccion=await Seccion.findByPk(id,{
        include:[{model:Usuario, as:'profesor'},{model:Curso, as: 'curso'}]
    });
    console.log(seccion.profesor.nombre);
    console.log(seccion.curso.nombre);

    const doc= new PDFdocument({
        size:"LETTER",
        bufferPages:true,
        autoFirstPage:false,
        font:"Helvetica",
        fontSize:8
    })
    
    let pageNumber=0;
    doc.on('pageAdded',()=>{
        pageNumber++;

        let bottom =doc.page.margins.bottom;

        doc.page.margins.bottom =0;
        doc.font('Helvetica').fontSize(8)
        doc.text(
            'Pag. '+pageNumber,
            (doc.page.width - 100)*0.5,
            doc.page.height -50,
            {
                width:100,
                align: 'center',
                lineBreak:false,
            }
        )
        doc.page.margins.bottom=bottom;
    })

    doc.addPage();
    doc.font("Helvetica-Bold").fontSize(14);
    doc.text("Centro Educativo LOGROS", 50,30);
    doc.moveDown();
    doc.font("Helvetica-Bold").fontSize(12);
    doc.text(`Curso: ${seccion.curso.nombre}`, 50, 50 );
    doc.moveDown();
    doc.text(`Sección: ${seccion.id}`, 50, 70 );
    doc.moveDown();
    doc.text(`Profesor: ${seccion.profesor.nombre} ${seccion.profesor.apellido}`, 50, 90);
    doc.moveDown();
    const rowNotas=[];

    notas.forEach(element =>{
        if(element.nota==null){
            element.nota="";
        }
        const temp_list=[element.estudiante.cedula, element.estudiante.nombre, element.estudiante.apellido, element.nota];
        rowNotas.push(temp_list);
    })
    const table ={
        title: "Lista de estudiantes con notas",
        headers: [
            {label:'Cédula',width:120},
            {label:'Nombre',width:150},
            {label:'Apellido',width:150},
            {label:'Nota',width:100}],
        rows: rowNotas,
        font:"Courier",
        fontSize:16
    }

    doc.table(table,{
        width:600,
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: () => {
          doc.font("Helvetica").fontSize(8);}
    })
    doc.on('data', callback);
    doc.on('end', endcallback);
    doc.end();
}
module.exports={PDFestudiante, PDFprofesor,PDFnota};