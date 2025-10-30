import express from "express";
import {  addUser, deleteUser, listUsers, updateUser } from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getUsers", listUsers);




// Example add user route (replace with your real logic)
router.post("/addUsers", auth, addUser);
router.delete('/:userId', auth, deleteUser);
router.put('/:userId', auth, updateUser);

export default router;
