import express from "express";
import { addUser, listUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", listUsers);

export default router;
