import Wishlist from "../Models/wishlistSchema.js";

/*ADD PRODUCT TO WISHLIST */
export const addProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, name, image, price } = req.body;
console.log("top: REQ BODY:", req.body);

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    const existingItem = wishlist.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingItem) {
      wishlist.items.push({
        productId,
        name,
        image,
        price,
        quantity: 1,
      });
    }

    await wishlist.save();
    console.log("save: REQ BODY:", req.body);



    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not added",
      error: error.message,
    });
  }
};



/*REMOVE PRODUCT FROM WISHLIST */
export const removeWishlistItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) throw new Error("Wishlist not found");

    wishlist.items = wishlist.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

/* FETCH USER WISHLIST*/
export const getWish = async (req, res) => {
  try {
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, items: [] });
    }

    const formattedWishlist = wishlist.items.map((item) => ({
      _id: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      qty: item.quantity,
    }));

    res.status(200).json({
      success: true,
      wishlist: formattedWishlist,
    });
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



export const addProductt=async(req,res)=>{
  try{
    const userId=req.user.id;
    const{productId,name,image,price}=req.body;
    console.log("top:REQ Body: ",req.body);
    let wishlist=await Wishlist.findOne({userId});
    if(!wishlist){
      wishlist=new Wishlist({userId},req.body);
    }
    const existingItem=wishlist.items.find(
      (item)=>item.productId.toString()===productId
      );

      if(!existingItem){
        wishlist.items.push(req.body);
      }

      await wishlist.save({
        success:true,
        message:"Product added to wishlist"
      });
  }catch(error){
    res.status(500).json({
      success:false,message:"Product not added",error:error.message
    })
  }
}
