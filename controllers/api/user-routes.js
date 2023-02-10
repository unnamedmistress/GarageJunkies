const router = require('express').Router();
const { User, Project } = require('../../models');

router.get ('/', async (req,res) =>{
    try {
        const users = await User.findAll()
        res.status(200).json(users)
        console.log(users)
      }
      catch (err) {
        res.status(500).json(err)
        console.log(err)
      }

})


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/delete', (req, res) => {
  try {
    console.log(req.body)
    if (req.session.logged_in) {
      req.session.destroy()
    }
    const user = User.destroy({
      where:{
        id:req.body.id
      }
    });
    // Send a message to the user saying that their account was deleted
    res.status(200).json('success');
  } catch (err) {
    // If there's an error, send a status code of 500 (Internal Server Error)
    res.status(500).json(err);
  }
});

module.exports = router;
