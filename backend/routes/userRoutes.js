const express = require('express');
const User = require('../models/User');
const Campaign = require('../models/Campaign'); // Ensure this model is imported
const router = express.Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.MONGO_URI;

// Register a new user (if not present) or retrieve existing user
router.post('/register', async (req, res) => {
    try {
        const { name, contact, password } = req.body;

        // Check if the user already exists by contact
        let user = await User.findOne({ contact });

        if (!user) {
            // Create a new user if not found
            user = new User({ name, contact, password });
            await user.save();
            return res.status(201).json({ message: "User registered successfully", user });
        }

        return res.status(200).json({ message: "User already exists", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/leaderboard", async (req, res) => {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db("test"); // Change "test" to your actual database name
  
      const users = await db.collection("users")
        .find({})
        .sort({ totalDonations: -1 }) // Sort users by totalDonations (descending)
        .toArray();
  
      res.status(200).json(users);
      await client.close();
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post('/get-donations', async (req, res) => {
    try {
        const { contact, password } = req.body;
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db("test"); // Change "test" to your actual DB name

        // Find the user by contact and password
        const user = await db.collection('users').findOne({ contact, password });

        if (!user) {
            await client.close();
            return res.status(404).json({ message: "User not found" });
        }

        // Extract totalContribution and resolve campaign names correctly
        const donations = await Promise.all(
            (user.totalContribution || []).map(async (contribution) => {
                try {
                    const campaign = await db.collection('campaigns').findOne({ _id: new ObjectId(contribution.campaignName) });

                    return {
                        date: contribution.date,
                        amountDonated: contribution.amountDonated,
                        campaignName: campaign ? campaign.name : "Unknown Name" // Extract name if found
                    };
                } catch (err) {
                    console.error("Error fetching campaign:", err);
                    return {
                        date: contribution.date,
                        amountDonated: contribution.amountDonated,
                        campaignName: "Charity"
                    };
                }
            })
        );

        res.status(200).json({ 
            user: { name: user.name, contact: user.contact, totalDonations: user.totalDonations }, 
            donations 
        });

        await client.close();
    } catch (error) {
        console.error("Error fetching user donations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


  

// Contribute to a campaign (Create user if not exists, then update contribution)
router.post('/contribute', async (req, res) => {
    try {
        const { name, contact, password, amount, campaignId } = req.body;
        const donationAmount = parseFloat(amount); // Ensure it's a number

        if (isNaN(donationAmount) || donationAmount <= 0) {
            return res.status(400).json({ message: "Invalid donation amount" });
        }

        let user = await User.findOne({ name, contact });

        if (!user) {
            // Create a new user if not found
            user = new User({
                name,
                contact,
                password,
                totalContribution: [{
                    amountDonated: donationAmount,
                    campaignName: campaignId
                }],
                totalDonations: donationAmount
            });
        } else {
            // Update existing user
            user.totalContribution.push({
                amountDonated: donationAmount,
                campaignName: campaignId
            });

            // Ensure numerical addition, not string concatenation
            user.totalDonations = (user.totalDonations || 0) + donationAmount;
        }

        await user.save();

        // Update the campaign's collected amount
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        campaign.collectedSoFar = (campaign.collectedSoFar || 0) + donationAmount;
        await campaign.save();

        res.status(200).json({ message: "Donation successful", user, campaign });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
