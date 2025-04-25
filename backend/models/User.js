const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact:{type:String,required:true},
    password:{type:String,required:true},
    totalContribution: [{ 
        date: { type: Date, default: Date.now },
        amountDonated: { type: Number, required: true },
        campaignName: { type: String, required: true }
    }],
    badgesEarned: [{ type: String }],
    totalDonations: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);
