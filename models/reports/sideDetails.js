const mongoose = require('mongoose');

// Define SiteDetails schema
const siteDetailsSchema = new mongoose.Schema({
    reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true },
    dcCapacity: { type: Number, required: true }, // MWp
    acCapacity: { type: Number }, // MW
    commissioningDate: { type: Date },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    moduleMountingStructure: { type: String, default: "Ground mounted" },
    numberOfPanels: { type: Number },
    panelBrandsModels: { type: String },
    inverterBrandsModels: { type: String },
    feedInTariff: { type: Number, required: true }, // USD/kWh
    panelMaxPower: { type: Number, required: true }, // Pmax (W)
    tiltAngle: { type: String }, // Summer/Winter
    photovoltaicPowerPotential: { type: Number, required: true }, // kWh/kWp per year
    landArea: { type: Number }, // acre
    pitch: { type: Number }, // meters
    clearDistanceBetweenRows: { type: Number }, // meters
    pvTechnology: { type: String },
    opacity: {
        type: Number,  // Opacity ko number me store karo (0 se 1 ke beech)
        required: true,
        min: 0,
        max: 1
    },
    color: { type: String }
});  

const SiteDetail = mongoose.model('SiteDetail', siteDetailsSchema);
module.exports = SiteDetail;