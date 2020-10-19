const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const TestimonialSchema = new Schema({
    imageUrl : {
        type:String
    },
    
    word :{
        type:String
    },

    Fname: {
        type:String
    },

    position: {
        type:String
    }
})

module.exports = mongoose.model('Testimonial', TestimonialSchema);