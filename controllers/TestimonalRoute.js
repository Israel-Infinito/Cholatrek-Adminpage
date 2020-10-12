const express = require('express');
const router = express.Router();
const Testimonial = require('../model/Testimonial');
const multer = require('multer');
const path =  require('path');





const storage = multer.diskStorage({
    destination: './public/uploads/images',
    filename:function(req,file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname)  );
    }
});


const upload = multer({
    storage: storage
}).fields([

    {
        name: 'imageUrl',
        
    }
    
]
    

)

router.get('/testimonial', (req,res)=>{
    res.render('Testimonial', {
        title: ' Testimonial',
    })
})


router.post('/testimonial', (req,res)=>{
   
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log( req.files.imageUrl[0].filename);
            
            const testimonial = new Testimonial({
                Fname : req.body.Fname,
                position: req.body.position,
                word:req.body.word,
                imageUrl: '/uploads/images/' +req.files.imageUrl[0].filename
            }).save((err,testimonial)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/');
                }
            })

        }
    })
})



module.exports = router;