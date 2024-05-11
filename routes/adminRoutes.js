const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();


router.get('/signup', requireAuth, adminController.signup_get);
router.get('/admin', adminController.admin_get);
router.post('/signup', adminController.signup_post);
router.post('/admin', adminController.admin_post);
router.get('/dashboard', requireAuth, adminController.dashboard_get);
router.get('/logout', adminController.logout_get);


module.exports = router;