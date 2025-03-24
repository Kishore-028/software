import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables.");
}

// ✅ Signup Route
router.post("/signup", async (req, res) => {
  try {
    console.log("📩 Signup Request Body:", req.body);
    
    const { name, email, password, phone, city, state, role } = req.body;
    
    // Check if all fields are provided
    if (!name || !email || !password || !phone || !city || !state || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }
    
    // Store password directly without hashing
    const newUser = new User({
      name,
      email,
      password, // Store plain password
      phone,
      city,
      state,
      role,
    });
    
    await newUser.save();
    console.log("✅ User Registered Successfully:", newUser);
    
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("⚠ Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    console.log("🔍 Login Request Received:", req.body);
    
    const { email, password, role } = req.body;
    
    // Check if all fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    console.log("🛠 User Found in DB:", user);
    
    if (!user) {
      return res.status(400).json({ error: "User not found. Please sign up." });
    }
    
    console.log("🔑 Entered Password:", password);
    console.log("🔑 Stored Password in DB:", user.password);
    
    // Direct password comparison instead of bcrypt
    const isPasswordValid = (password === user.password);
    console.log("✅ Password Match:", isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    
    // Check if role matches
    if (user.role !== role) {
      return res.status(400).json({ error: "Invalid role for this user." });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    console.log("✅ Login Successful!");
    res.status(200).json({ 
      message: "Login successful!", 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      } 
    });
  } catch (error) {
    console.error("⚠ Login Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
