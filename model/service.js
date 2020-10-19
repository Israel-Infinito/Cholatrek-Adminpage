const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const serviceSchema = new Schema({
    
    
    Name : {
       type: String
    },
    
    Email:{
        type:String
    },
    
    servicetype :{
        type:String
    },

    Message: {
        type:String
    }
})

module.exports = mongoose.model('services', serviceSchema);