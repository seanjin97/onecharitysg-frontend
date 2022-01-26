const express = require('express');
const authController = require('../controllers/auth/authController');
const loginController = require('../controllers/login/loginController');
const registerController = require('../controllers/register/registerController');
const reviewController = require('../controllers/review/reviewController');
const updateController = require('../controllers/update/updateController');

const router = express.Router();

// Auth route
router.get(
    '/auth/generate', 
    authController.authenticate
);

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *    description:  
 */

router.get(
    '/auth/verify', 
    authController.verify
);

/**
 * @swagger
 * /api/auth/clear:
 *   get:
 *    description:  
 */

router.get(
    '/auth/clear', 
    authController.clear
);

/**
 * @swagger
 * /api/login:
 *   post:
 *    description:  
 */

router.post(
    '/login',
    loginController.login
);

/**
 * @swagger
 * /api/update:
 *   post:
 *    description:  
 */

router.post(
    '/update',
    updateController.update
);

/**
 * @swagger
 * /api/register:
 *   post:
 *    description:  
 */

router.post(
    '/register',
    registerController.register
);

/**
 * @swagger
 * /api/review:
 *   post:
 *    description:  
 */

router.post(
    '/review',
    reviewController.review
);

module.exports = router;