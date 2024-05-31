const { Router } = require('express');
const userController = require(`../controllers/userController`);

const router = Router();

router.get('/', userController.index_get);
router.get('/consult', userController.consultpage_get);
router.get('/applyloan', userController.applyloan_get);
router.get('/businessloan', userController.businessloan_get);
router.post('/applyloan', userController.applyloan_post);
router.post('/businessloan', userController.businessloan_post);

module.exports = router;