const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename(req, file, cb) {
    const hash = crypto.randomBytes(10).toString('hex');
    const fileName = `${hash}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload;

