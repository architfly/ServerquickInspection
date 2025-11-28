const mongoose = require('mongoose');


const fastInspactionSchema = new mongoose.Schema({
    imageProcessedid:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'ImageProcessed',
        require:true
    },
    reportid:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Report',
    },
    currentBatch:{
        type:Number,
        default:1,
    },
    shape:[
        {
            x: { type: Number, required: true },
            y: { type: Number, required: true },
            width: { type: Number, enum:6  , require:true},
            height: { type: Number, enum:6 , require:true},
            batch:{type:Number}
          }
    ]
},{ timestamps: true });

const FastInspaction = mongoose.model('FastInspaction', fastInspactionSchema);

module.exports = FastInspaction;


// const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid'); // Install with `npm install uuid`

// const fastInspactionSchema = new mongoose.Schema({
//     imageProcessedid: {
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: 'ImageProcessed',
//         required: true
//     },
//     reportid: {
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: 'Report',
//     },
//     shape: [
//         {
//             batchId: { type: String, required: true }, 
//             x: { type: Number, required: true },
//             y: { type: Number, required: true },
//             width: { type: Number, enum: [6], required: true },
//             height: { type: Number, enum: [6], required: true },
//         }
//     ]
// }, { timestamps: true });

// // // Middleware to add batchId to each new shape before saving
// // fastInspactionSchema.pre('save', function (next) {
// //     const batchId = uuidv4(); // Generate a unique batchId for this group
// //     this.shape.forEach(shape => {
// //         if (!shape.batchId) {
// //             shape.batchId = batchId; // Assign batchId to each new shape
// //         }
// //     });
// //     next();
// // });

// const FastInspaction = mongoose.model('FastInspection', fastInspactionSchema);

// module.exports = FastInspaction;
