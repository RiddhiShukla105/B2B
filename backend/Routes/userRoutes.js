import { createUser, getUser,deleteUser, blockUser, unblockUser, loginUser } from "../Controller/userController.js";
import express from 'express'

const router=express.Router()

router.post('/create-user',createUser)
router.put('/block-user/:id',blockUser)
router.put('/unblock-user/:id',unblockUser)
router.get('/get-user',getUser)
router.delete('/delete-user/:id',deleteUser)
router.post('/login-user',loginUser)


export default router;