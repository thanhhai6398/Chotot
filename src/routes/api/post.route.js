const express = require('express');
const router = express.Router();
const multer = require('multer');
const controllers = require('../../controllers/post.controller');
const verifyJWT = require('../../middlewares/verifyJWT');
const verifyRoles = require('../../middlewares/verifyRoles');
const { USER } = require('../../utils/role_list');
const ROLE_LIST = require('../../utils/role_list');
const DIR = require('../../utils/uploadDir');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const arr = file.originalname.split('.');
    const fileName =
      Math.random().toString(36).substring(2, 9) + '.' + arr[arr.length - 1];
    console.log(fileName);
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

router.get('', controllers.getAll);
router.get('/status/:id', controllers.getPostsByStatusId);
router.get('/:id', controllers.getById);
router.get('/search/:nameSearch', controllers.findPostByName);
router.post(
  '/search/image',
  upload.single('searchImage'),
  controllers.findPostByImage
);

router.use(verifyJWT);
router.use(verifyRoles(ROLE_LIST['ADMIN'], ROLE_LIST['USER']));
router.post('/upload', controllers.uploadPost);
router.get('/user/:id', controllers.getPostByUserId);
router.put('/edit/:id', controllers.editPost);

router.patch("/savePost/:id", verifyJWT, controllers.savePost);
router.patch("/unSavePost/:id", verifyJWT, controllers.unSavePost);
router.put('/active/:id', controllers.activePost);
router.put('/hide/:id', controllers.hidePost);

module.exports = router;
