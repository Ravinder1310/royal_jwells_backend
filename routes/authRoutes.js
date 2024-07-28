import express from "express"
import {registerController,loginController, forgotPasswordController, updateProfileController, UserController}  from "../controllers/authControllers.js"
import { LoginMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

// router obj
const router = express.Router();

// routing
// Register || METHOD POST

router.post('/register',registerController);

// Login || METHOD POST

router.post('/login', loginController);

// forgot password

router.post('/forgot-password', forgotPasswordController)

// protected route auth

router.get('/user-auth',LoginMiddleware, (req,res) => {
    res.status(200).send({ok:true}); 
})

// get all users
router.get('/get-user',LoginMiddleware,isAdmin, UserController)

// protected route auth

router.get('/admin-auth',LoginMiddleware,isAdmin, (req,res) => {
    res.status(200).send({ok:true}); 
})

// update profile
router.put('/profile',LoginMiddleware, updateProfileController);

export default router;