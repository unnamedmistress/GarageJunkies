const express = require('express');
const router = express.Router();
const { User } = require('../models');

// This route is used to display the user account page
router.get('/', (req, res) => {
  // Use the res object to render the useraccount view
  res.render('useraccount');
});

// This route is used to handle update requests from the user account page
router.put('/', async (req, res) => {
  try {
    // Use the request body to update the user's account information in the database
    const user = await User.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    // Send the updated user information back to the user
    res.send(user);
  } catch (err) {
    // If there's an error, send a status code of 500 (Internal Server Error)
    res.status(500).json(err);
  }
});

// This route is used to handle delete requests from the user account page
router.delete('/', async (req, res) => {
  try {
    // Use the request body to delete the user's account information from the database
    const user = await User.destroy({
      where: {
        id: req.body.id
      }
    });
    // Send a message to the user saying that their account was deleted
    res.send(user);
  } catch (err) {
    // If there's an error, send a status code of 500 (Internal Server Error)
    res.status(500).json(err);
  }
});

module.exports = router;
