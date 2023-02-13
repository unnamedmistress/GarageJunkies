const router = require('express').Router();
const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');
const searchRoutes = require('./search-routes');




router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/search', searchRoutes);



module.exports = router;
