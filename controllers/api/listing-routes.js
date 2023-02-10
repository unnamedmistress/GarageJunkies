const router = require('express').Router();
const { Listing, User } = require('../../models');


// GET all listings
router.get('/', async (req, res) => {
  try {
  // find all categories
  const listings = await Listing.findAll({
    // include its associated User
    include: [{ model: User }],
  });
  res.status(200).json(listings);
  } catch (err) {
    res.status(500).json(err);
  }
});


// CREATE a new listing
router.post('/', async (req, res) => {
  try {
    const listing = await Listing.create({
      item_name: req.body.item_name,
    });
    res.status(200).json(listing);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;