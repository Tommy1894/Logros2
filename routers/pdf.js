const {PDFestudiante, PDFprofesor, PDFnota} = require('../controllers/pdf.controllers');


const router=require('express').Router();


router.get('/pdfestudiante' , (req,res)=>{
    const Stream=res.writeHead(200, {
        'Content-Type':'application/pdf',
        'Content-Disposition': 'attachment;filename=estudiantes.pdf'
    })
    
    PDFestudiante(
        (chunk) =>Stream.write(chunk),
        ()=> Stream.end()   
    )
} )

router.get('/pdfprofesor' , (req,res)=>{
    const Stream=res.writeHead(200, {
        'Content-Type':'application/pdf',
        'Content-Disposition': 'attachment;filename=profesores.pdf'
    })
    
    PDFprofesor(
        (chunk) =>Stream.write(chunk),
        ()=> Stream.end()
    )
})

router.get('/nota/seccion=:id', (req,res)=>{
    const Stream=res.writeHead(200, {
        'Content-Type':'application/pdf',
        'Content-Disposition': 'attachment;filename=profesores.pdf'
    })
    
    PDFnota(
        (chunk) =>Stream.write(chunk),
        ()=> Stream.end(),
        req.params.id
    )
})

module.exports=router;

