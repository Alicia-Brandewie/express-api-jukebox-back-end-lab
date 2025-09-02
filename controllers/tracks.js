const Track = require('../models/track.js');
const express = require('express');
const router = express.Router();

// CREATE - POST - /tracks

router.post('/', async (req, res) => {
    try {
        const createdTrack = await Track.create(req.body);
        res.status(201).json(createdTrack);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// GET - INDEX - /tracks
router.get('/', async (req, res) => {
    try {
        const indexTracks = await Track.find();
        res.status(200).json(indexTracks);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// GET - SHOW - /tracks/:id
router.get('/:Id', async (req, res) => {
    try {
        const showTrack = await Track.findById(req.params.Id);
        if (!showTrack) {
            res.status(404);
            throw new Error("Track not found.");
        }
        res.status(200).json(showTrack);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

// PUT - UPDATE - /tracks/:id
router.put('/:Id', async (req, res) => {
    try {
        const updatedTrack = await Track.findByIdAndUpdate(req.params.Id, req.body, {
            new: true,
        });
        if (!updatedTrack) {
            res.status(404);
            throw new Error('Track not found.');
        }
        res.status(200).json(updatedTrack);
    } catch (eer) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

// DELETE - DELETE - /tracks/:id
router.delete('/:Id', async (req, res) => {
    try {
        const deletedTrack = await Track.findByIdAndDelete(req.params.Id);
        if (!deletedTrack) {
            res.status(404)
            throw new Error('Track not found.');
        }
        res.status(200).json(deletedTrack);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

module.exports = router;