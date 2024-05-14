import express from "express";
const Users_API = express.Router();
import Users from "../../models/UserModel.js";
 
Users_API.post("/create", async (req, res) => {
    try {
      const users = await Users.create(req.body);
      res.status(201).json({ message: "Users Info created successfully", data: users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
 
Users_API.get("/read", async (req, res) => {
    try {
      const users = await Users.findAll();
      res.json({ message: "Users Info retrieved successfully", data: users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
 
Users_API.get("/read/:Email", async (req, res) => {
    try {
      const email = req.params.Email;
      const users = await Users.findOne({
        where: { Email: email },
      });
 
      if (users) {
        res.json({ message: "Users Info retrieved successfully", data: users });
      } else {
        res.status(404).json({ error: "Email not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
 
Users_API.put("/update/:Email", async (req, res) => {
    try {
        const email = req.params.Email;
        const updatedUsers = req.body;
        const existingUsers = await Users.findOne({
            where: { Email: email },
      });
 
      if (existingUsers) {
        await existingUsers.update(updatedUsers);
        res.json({ message: "Users Info updated successfully", data: existingUsers });
      } else {
        res.status(404).json({ error: "Email not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
 
Users_API.delete("/delete/:Email", async (req, res) => {
    try {
        const email = req.params.Email;
        const deletedUsers = await Users.findOne({
        where: { Email: email },
      });
 
      if (deletedUsers) {
        await deletedUsers.destroy();
        res.json({ message: "Users Info deleted successfully" });
      } else {
        res.status(404).json({ error: "Email not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
 
export default Users_API;
 
 