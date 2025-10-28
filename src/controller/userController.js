import { createUser, deleteUserById, getUsers, updateUserById } from "../model/userModel.js";

export const addUser = async (req, res) => {
  try {
    
    const { name, email } = req.body;
    console.log(req.body,"✅✅✅✅✅✅✅✅");
    const newUser = await createUser(name, email);
    
    res.status(201).json({msg:'usercreated successfully',
      user:newUser
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }

    const deletedUser = await deleteUserById(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ msg: "User deleted successfully", user: deletedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }

    if (name === undefined && email === undefined) {
      return res.status(400).json({ error: "Provide at least one of name or email" });
    }

    const updatedUser = await updateUserById(userId, { name, email });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found or no changes provided" });
    }

    return res.status(200).json({ msg: "User updated successfully", user: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};