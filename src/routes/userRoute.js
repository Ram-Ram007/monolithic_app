import express from "express";
import {  addUser, deleteUser, listUsers } from "../controller/userController.js";

const router = express.Router();

router.get("/getUsers", listUsers);




// Example add user route (replace with your real logic)
router.post("/addUsers", addUser);
router.delete('/deleteUser', deleteUser);
router.delete('/:userId', deleteUser);

export default router;
