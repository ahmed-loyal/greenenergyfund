const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();


router.get('/signup', requireAuth, adminController.signup_get);
router.get('/admin', adminController.admin_get);
router.post('/signup', adminController.signup_post);
router.post('/admin', adminController.admin_post);
router.get('/dashboard', requireAuth, adminController.dashboard_get);
router.get('/personalloandata', requireAuth, adminController.personalloandata_get);
router.get('/businessloandata', requireAuth, adminController.businessloandata_get);
router.get('/logout', adminController.logout_get);
router.delete('/:id', adminController.personalloandata_delete);
router.delete('/:id', adminController.businessloandata_delete);


module.exports = router;