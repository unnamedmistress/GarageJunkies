const express = require('express');
const router = express.Router();
const multer = require('multer');

const app = express();


app.post('/photos', upload.single('photos'), (req, res) => {  
  const photo = req.file;
  const photobody = req.body;
  res.send('Photo uploaded successfully');
});
// Set up Multer to handle photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({ storage: storage });

// Route to handle photo upload
router.post('/photo-upload', upload.single('photo'), (req, res, next) => {
  // Validate the photo
  if (!req.file) {
    return res.status(400).json({ message: 'No photo was selected' });
  }

  // Store the photo in the specified location
  const photo = req.file;

  // Return success message
  return res.status(200).json({ message: 'Photo uploaded successfully' });
});

module.exports = router;
