const router = require('express').Router();
const { Project, User } = require('../../models');
// Import sequelize Operator object
const { Op } = require('sequelize');

// GET listings by address
router.get('/:address', async (req, res) => {
  try {
    // find projects (listings) by `address` value
    const { zip } = req.params;
    const { zipCode } = req.query;
    const projects = await Project.findAll({
      where: {
        address: {
          // Operator and wildcard to find listings that contain zipcode in address field
          [Op.like]: `%${zipCode}%`
        }
      }
    });

  if (!projects) {
    res.status(404).json({ message: 'No listings found in that zipcode!' });
    return;
  }
  res.status(200).json(projects);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;