const express = require('express');
const router = express.Router();
const Blog = require('../model/blog');

//get blog post
router.get('/',(req,res)=>{
    Blog
    .find({})
    .exec((err,blog)=>{
        res.render('blog', {
            title: 'Blog Details',
            blog:blog
        })
    })
});

//get single blog update
router.get('/:id', (req,res)=>{
    Blog
        .findOne({ _id : req.params.id})
        .exec((err,blogs)=>{

            Blog
                .find({})
                .exec((err,blogFull)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.render('singleBlog', {
                            title: 'Single Blog',
                            blog:blogs,
                            blogFull:blogFull
                        })
                    }
                })
          
            
        })
})


module.exports = router;