import Product from "../Models/productSchema.js";


export const createProduct = async (req, res) => {
    try {
        // Collect filenames of all uploaded images
        const images = req.files ? req.files.map(file => file.filename) : [];

        const {
            name,
            category,
            price,
            mqty,
            lqty,
            xlqty,
            sub_category,
            color,
            seo,
            desc
        } = req.body;

        const newProduct = new Product({
            name,
            category,
            price,
            mqty,
            lqty,
            xlqty,
            sub_category,
            color,
            seo,
            desc,
            image: images    // image filenames array
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Product saved successfully",
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Backend Error",
            error: error.message
        });
    }
};


// export const loadProduct=async(req,res)=>{
//     try{
//         const product=await Product.find()
//          return res.status(200).json({success:true,message:"Products Found",product})
//     }catch(error){
//         console.log(error)
//         return res.status(500).json({success:false,message:"Backend Error"})
//     }
// }

export const loadProduct = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      product: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const deleteProduct=async(req,res)=>{
    try{
        const{id}=req.params
        const product=await Product.findByIdAndDelete(id)
         return res.status(200).json({success:true,message:"Products Deleted",product})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Backend Error"})
    }
}

export const editProduct=async(req,res)=>{
    try{
        const{id}=req.params
        const product=await Product.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({success:true,message:"Products Updated",product})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Backend Error"})
    }
}


export const loopProduct = async (req, res) => {
  try {
    const { category } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 39;
    const cycle = parseInt(req.query.cycle) || 0;

    const skip = (page - 1) * limit;
    // const skip=0;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);

    const modifiedProducts = products.map(product => {
      if (!product.image || product.image.length === 0) {
        return product;
      }

      const imageIndex = cycle % product.image.length;

      return {
        ...product.toObject(),
        displayImage: product.image[imageIndex]
      };
    });

    res.status(200).json({
      success: true,
      product: modifiedProducts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export const createBroduct=async(req,res)=>{
  try{
    const images=req.files?req.files.map(file=>file.filename):[];

    const {
      name,
      category,
      price,
      mqty,
      lqty
    }=req.body

    const newBroduct=new Broduct({
      name,category,image:images
    })

    await newBroduct.save();

    return res.status(201).json({
      success:true,
      message:"Product saved successfully",
      broduct:newBroduct
    })

  }catch(err){
    console.log(err)
  }
}


