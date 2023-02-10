const router = require('express').Router();
const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');
const listingRoutes = require('./listing-routes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/listings', listingRoutes);

module.exports = router;
