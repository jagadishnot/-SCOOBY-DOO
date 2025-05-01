const express = require('express');
const multer = require('multer');
const router = express.Router();
const Member = require('../models/Member');

// Configure file storage for image uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST /api/members
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      role,
      email,
      phone,
      dob,
      gender,
      address,
      skills,
      bio
    } = req.body;

    // Parse skills if it's a stringified array or comma-separated
    const skillsArray = Array.isArray(skills)
      ? skills
      : skills?.split(',').map(s => s.trim());

    const newMember = new Member({
      name,
      role,
      email,
      phone,
      dob: dob ? new Date(dob) : null,
      gender,
      address,
      skills: skillsArray,
      bio,
      image: req.file?.filename || null,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    console.error('Error saving member:', err);
    res.status(500).json({ error: 'Failed to save member' });
  }
});

// GET /api/members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// GET /api/members/:id
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch member' });
  }
});

module.exports = router;
