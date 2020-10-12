const express = require('express');
const router = express.Router();
const Testimonial = require('../model/Testimonial')



router.get('/',(req,res)=>{
    res.render('MyAdmin', {
        title: 'Admin Panel',
        user: req.user,
        message:req.flash('message')
    })
})

router.get('/Testimonial',(req,res)=>{
    res.render('testimonial', {
        title: 'Testimonial Page',
      
    })
})







module.exports = router;