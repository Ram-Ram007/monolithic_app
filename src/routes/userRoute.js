import express from "express";
import {  addUser, deleteUser, listUsers, updateUser } from "../controller/userController.js";

const router = express.Router();

router.get("/getUsers", listUsers);




// Example add user route (replace with your real logic)
router.post("/addUsers", addUser);
router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser);

export default router;
