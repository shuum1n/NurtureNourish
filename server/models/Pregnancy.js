const mongoose = require('mongoose');
const validator = require('validator');

const pregnancyDataSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        default: new Date()
    },
    childrenNumber: {
        type: Number,
        default: 1
    },
    dailyNutrition: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DailyNutrition'
    }]
})

const PregnancyData = new mongoose.model('pregnancyData', pregnancyDataSchema);

module.exports = PregnancyData;