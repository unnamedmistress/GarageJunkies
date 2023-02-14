const router = require('express').Router();
const { Project, User } = require('../../models');
// Import sequelize Operator object
const { Op } = require('sequelize');
// Import node-fetch to make back end fetch to google geocode
const fetch = require('node-fetch');
// Google Geocode API key
const geoApi = 'AIzaSyC7KptZv_AlWMLmOh6A_AjA_tuc5vJTZ64';

// GET listings by zip code in address field
router.get('/:zip', async (req, res) => {
  try {
    // Pull zip out of address
    const { zip } = req.params;
    // Zip code and/or item search
    const { zipCode, item } = req.query;

    const where = {};

    // Check if both zipCode and item query parameters are present
    if (zipCode && item) {
      where.address = {
      // Like operator/wildcard looks for listings that contain zipcode

        [Op.like]: `%${zipCode}%`
      };
      // Like operator/wildcard looks for listings that contain item name or anything similar
      where.item_name = {
        [Op.like]: `%${item}%`
      };
    } else if (zipCode) {
      where.zip = {
        [Op.like]: `%${zipCode}%`
      };
    } else if (item) {
      where.item_name = {
        [Op.like]: `%${item}%`
      };
    }

    const projects = await Project.findAll({
      where
    });


  if (!projects) {
    res.status(404).json({ message: 'No listings found in that zipcode!' });
    return;
  }

  //  loop through each project, make API call for each address, and convert into latitude and longitude
  const updatedProjects = await Promise.all(
    projects.map(async (project) => {
      const projectAddress = `${project.street_address} ${project.city} ${project.state} ${project.zip}`;
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(projectAddress)}&key=${geoApi}`);
      const data = await response.json();
      console.log('data:', data);
      if (data.results) {
        let lat = data.results[0].geometry.location.lat;
        let lng = data.results[0].geometry.location.lng;
      // make sure it is converting correctly
        console.log(lat, lng);
      
        // Return new object with updated lat and lon
        return {
          ...project.toJSON(),
          latitude: lat,
          longitude: lng
        };
      }
      return project;
    })
  );
console.log('updated project:', updatedProjects)
  res.status(200).json(updatedProjects);
  // res.render('search', { projects: updatedProjects.get({ plain: true }) })
  // .json(updatedProjects);

} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;