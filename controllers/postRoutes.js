const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();

const Contact = require('../model/contact')

// coupled alingside nodemailer
router.post('/yourwork', (req,res)=>{
    res.send('we are here')
} )

router.post('/registrationForm' ,(req,res)=>{
    res.send('you are about to register yourself')
});

router.post('/contactForm', (req,res)=>{
    // const contact = new Contact({
    //     name : req.body.name,
    //     email: req.body.email,
    //     website:req.body.website,
    //     message:req.body.message

    // create reusable transporter object using the default SMTP transport
             let transporter = nodemailer.createTransport({
                host: "mail.privateemail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                        user: 'info@faithbreed.org', // generated ethereal user
                        pass: 'Kingdombreed_01', // generated ethereal password
                      },
                tls:{
                    rejectUnauthorized:false
                }
                });
    
                // send mail with defined transport object
                let mailOptions = {
                from: '"Nodemailer Contact" <info@faithbreed.org>', // sender address
                to: " skolly150@gmail.com, israelalagbe214@gmail.com, segun-kola@itusacademy.com", // list of receivers
                subject: "Cholatrek Training Institute", // Subject line
                text: "Hello world?", // plain text body
                html: 'na we dey here', // html body
                };

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log(error)
                    }else{
                        req.flash('message', "message has been sent!")
                        res.redirect('/contact')
                    }
                })

                
            })

;

module.exports = router;