const mongoose = require('mongoose');
// const { HandleStoreExcSummry } = require('../../controler/Generate_Pdf');


const Cropped_Image = new mongoose.Schema({
    reportid:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Report'
    },
    image_id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ImageProcessed',
    }
    ,
    image_url:[{
        type:String
    }]
},{timeseries:true})


const CropedImage = mongoose.model('CropedImage' , Cropped_Image);
module.exports = CropedImage;