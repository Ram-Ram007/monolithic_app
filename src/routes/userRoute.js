import express from "express";
import {  listUsers } from "../controller/userController.js";

const router = express.Router();

router.get("/getUsers", listUsers);




// Example add user route (replace with your real logic)
router.post("/", (req, res) => {
  // Add user logic here
  res.status(201).send("User added");
});

export default router;
