const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const userAccountsRoutes = require('./useraccountRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/useraccount', userAccountsRoutes);

module.exports = router;