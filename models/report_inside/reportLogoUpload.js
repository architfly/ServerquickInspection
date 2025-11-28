const mongoose = require('mongoose');

const ReportLogoSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Report',
      required: true,
    },
    leftlogo:{
        type:String,
    },
    rightlogo:{
        type:String,
    }
     
  },
  { timestamps: true }
);

const ReportLogo = mongoose.model('ReportLogo', ReportLogoSchema);
module.exports = ReportLogo;
