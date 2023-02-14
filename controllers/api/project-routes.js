const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage });


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


router.post('/', withAuth, upload.single('photo'),async (req, res) => {
  console.log(req.body);
  try {
    const newProject = await Project.create({
    description: req.body.description,
    street_address: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    item_name: req.body.item_name,
    price: req.body.price,
    user_id: req.session.user_id,
    photo: `./uploads/${req.file.originalname}`
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


module.exports = router;
