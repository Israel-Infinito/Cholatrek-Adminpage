const express = require('express');
const router = express.Router();
const Blog = require('../model/blog');
const multer = require('multer');
const path =  require('path');


const storage = multer.diskStorage({
    destination: './public/uploads/images',
    filename:function(req,file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname)  );
    }
});


const upload = multer({
    storage : storage
}).fields([

    {
        name: 'imgUrl',
        
    }
    
]
    

)

router.get('/blogPost', (req,res)=>{
    res.render('blogUpload', {
        title: ' Blog Upload',
        message: req.flash('message')
    })
})


//create an admin blog
router.get('/blogDisplay', (req,res)=>{
   Blog
    .find({})
    .sort({_id : -1})
    .exec((err,blog)=>{
        res.render('adminBlog', {
            title: 'Blog Display',
            blog:blog
        })
    })
    
})

//create a blog post

router.post('/blogPost', (req,res)=>{
   
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log( req.files.imgUrl[0].filename);
            
            const blog = new Blog({
                title : req.body.title,
                date: req.body.date,
                category:req.body.category,
                excerpt:req.body.excerpt,
                imgUrl: '/uploads/images/' +req.files.imgUrl[0].filename
            }).save((err,blog)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/admin/blogPost');
                }
            })

        }
    })
})

//edit a blog post
router.post('/blogEdit/:id', (req,res)=>{

        // console.log(req.params.id)
        let items = {}
    
        items.title =  req.body.title
        items.excerpt = req.body.excerpt
        items.date =   req.body.date
        
        
        console.log(items.title)
        let query  = { _id : req.params.id};
        
       
    
        Blog
            .update(query, items, function(err){
    
                if(err){
    
                    console.log(err)
    
                }else{
    
                    res.redirect('/admin/blogDisplay')
                }
            });

})

//delete a blog post
router.post('/blogDelete/:id', (req,res)=>{

    Blog.findByIdAndRemove({ _id : req.params.id }).then((Blog)=>{
        res.redirect('/admin/blogDisplay')
    });

});


module.exports = router;