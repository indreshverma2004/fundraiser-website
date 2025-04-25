const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    endDate: { type: Date, required: true },
    photo: { type: String },
    description: { type: String, required: true },
    totalContributionNeeded: { type: Number, required: true },
    collectedSoFar: { type: Number, default: 0 },
    category: { type: String, required: true } // 🔹 Add category field
});

module.exports = mongoose.model('Campaign', CampaignSchema);
