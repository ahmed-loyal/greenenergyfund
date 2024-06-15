const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const userController = require(`../controllers/userController`);


const router = Router();


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage });



router.get('/', userController.index_get);
router.get('/consult', userController.consultpage_get);
router.get('/applyloan', userController.applyloan_get);
router.get('/businessloan', userController.businessloan_get);
router.get('/personalloan', userController.personalloan_get);
router.post('/personalloan', upload.fields([ { name: 'bankStatement', maxCount: 1 }, { name: 'idFront', maxCount: 1 }, { name: 'idBack', maxCount: 1 },]), userController.personalloan_post);
router.post('/businessloan', upload.fields([ { name: 'bankStatement', maxCount: 1 }, { name: 'idFront', maxCount: 1 }, { name: 'idBack', maxCount: 1 },]), userController.businessloan_post);
router.get('/applicationcompleted', userController.applicationcompleted_get);

module.exports = router;