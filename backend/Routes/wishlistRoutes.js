import express from 'express'
import{addProduct,getWish,removeWishlistItem} from '../Controller/wishlistController.js';
import auth from '../Middleware/auth.js';

const router=express.Router();

router.post("/add",auth,addProduct)
router.delete("/remove",auth,removeWishlistItem)
router.get("/fetch",auth,getWish)


export default router;