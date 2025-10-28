import express from "express";
import { listProduct } from "../controller/productsController.js"; 

const router = express.Router();

router.get("/getProduct", listProduct);


export default router;
