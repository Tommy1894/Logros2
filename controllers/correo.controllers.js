var nodemailer =require('nodemailer');
const Usuario = require('../models/usuario');

async function enviarCorreo(req,res){
    const cedula= req.params.value;
    const codigo=Math.floor(Math.random() * (999999 - 100000) + 100000)
    try{
      const usuario = await Usuario.findByPk(cedula);
      const correo= usuario.correo;
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 't321830515@gmail.com',
            pass: 'vqbrzokxymdivrkx'
        }
    });
    var mensaje=`Este es tu codigo de validacion: ${codigo}`;
    
    var mailOptions = {
        from: 't321830515@gmail.com',
      to: correo,
      subject: `Codigo de validacion`,
      text: mensaje
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        {
        console.log('Email enviado: ' + info.response);
        res.json(codigo)
        }
      });
    }
    catch(error){
      res.status(500).json({
        message: error.message
    });
    }
    
}

module.exports=enviarCorreo;