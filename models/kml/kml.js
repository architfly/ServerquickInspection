const mongoose = require('mongoose');


const KmlSchema = new mongoose.Schema({
     
    reportid:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Report',
    },
    kml_url:[{
        type:String,
         
    }],
    
},{ timestamps: true });

const Kml  = mongoose.model('KmlSchema', KmlSchema);

module.exports = Kml;
