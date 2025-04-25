const express = require("express");
const multer = require("multer");
const Campaign = require("../models/Campaign");

const router = express.Router();

// Multer setup for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create Campaign Route
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, location, endDate, description, totalContributionNeeded,category } = req.body;

    const campaign = new Campaign({
      name,
      location,
      endDate,
      description,
      totalContributionNeeded,
      photo: req.file ? `data:image/jpeg;base64,${req.file.buffer.toString("base64")}` : null,
      category,
    });

    await campaign.save();
    res.status(201).json({ message: "Campaign created successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: "Error creating campaign", error });
  }
});

// Get all campaigns
router.get('/', async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const campaign = await Campaign.findById(req.params.id);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

module.exports = router;
