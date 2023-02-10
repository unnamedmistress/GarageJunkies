const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get ('/', async (req,res) =>{
    try {
        const items = await Project.findAll()
        res.status(200).json(items)
        console.log(items)
      }
      catch (err) {
        res.status(500).json(err)
        console.log(err)
      }

})


router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET projects by address
router.get('/:address', async (req, res) => {
  try {
    // find projects (listings) by `address` value
    const projects = await Project.findAll({
      where: {
        address: req.params.address,
      }
    });
    // include its associated User
  //   include: [{ model: Product }],
  // });

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
