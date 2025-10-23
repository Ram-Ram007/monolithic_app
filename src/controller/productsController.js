import { getProducts } from "../model/productModel.js";



export const listProduct = async(req,res) =>{
  try{
    const products = await getProducts();
    res.json(products)
  }

  catch(err){
    res.status(500).json({error: err.message })
  }
};