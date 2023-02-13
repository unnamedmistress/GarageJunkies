const router = require('express').Router();
const { Project, User } = require('../../models');
// Import sequelize Operator object
const { Op } = require('sequelize');
// Import node-fetch to make back end fetch to google geocode
const fetch = require('node-fetch');
// Google Geocode API key
const geoApi = 'AIzaSyC7KptZv_AlWMLmOh6A_AjA_tuc5vJTZ64';

// GET listings by zip code in address field
router.get('/:address', async (req, res) => {
  try {
    // find projects (listings) by `address` value
    const { zip } = req.params;
    const { zipCode, item } = req.query;
    const where = {};

    // Check if both zipCode and item query parameters are present
    if (zipCode && item) {
      where.address = {
        [Op.like]: `%${zipCode}%`
      };
      where.item_name = {
        [Op.like]: `%${item}%`
      };
    } else if (zipCode) {
      where.address = {
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

    // const projects = await Project.findAll({
    //   where: {
    //     address: {
    //       // Operator and wildcard to find listings that contain zipcode in address field
    //       [Op.like]: `%${zipCode}%`
    //     }
    //   }
    // });

  if (!projects) {
    res.status(404).json({ message: 'No listings found in that zipcode!' });
    return;
  }

  //  loop through each project, make API call for each address, and convert into latitude and longitude
  const updatedProjects = await Promise.all(
    projects.map(async (project) => {
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(project.address)}&key=${geoApi}`);
      const data = await res.json();
      console.log('data:', data);
      if (data.results) {
        let lat = data.results[0].geometry.location.lat;
        let lng = data.results[0].geometry.location.lng;
        let location = { lat: lat, lng: lng };
      // make sure it is converting correctly
        console.log(location);
      
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
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;