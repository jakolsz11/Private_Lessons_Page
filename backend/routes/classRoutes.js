const express = require('express');
const { getDispositions, getClasses, addDisposition, deleteClasses, signUpForClasses, adminCancelClasses, userCancelClasses, getUserClasses, getFreeClasses, editComment } = require('../controllers/classController');
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken');

const router = express.Router();

//user
router.use(verifyIsLoggedIn);
router.post('/sign-up-for-classes', signUpForClasses);
router.post('/user/cancel-classes', userCancelClasses);
router.get('/user', getUserClasses);
router.get('/free-lessons', getFreeClasses);
router.patch('/edit-comment/:id', editComment);

//admin
router.use(verifyIsAdmin);
router.get('/dispositions', getDispositions);
router.get('/my-classes', getClasses);
router.post('/disposition', addDisposition);
router.delete('/dispositions', deleteClasses);
router.post('/admin/cancel-classes', adminCancelClasses);

module.exports = router;