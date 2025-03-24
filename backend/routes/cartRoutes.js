import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Menu from "../models/Menus.js";
import Order from "../models/Order.js";
  import crypto from "crypto"; // To generate unique order numbers

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Convert userId and itemId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid userId or itemId" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const menuItem = await Menu.findById(itemId);
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

    // Initialize cart if not present
    if (!user.cart) user.cart = [];

    // Check if item already exists in cart
    const itemExists = user.cart.find(item => item._id.toString() === itemId);
    if (itemExists) {
      return res.status(400).json({ message: "Item already in cart" });
    }

    user.cart.push(menuItem);
    await user.save();

    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error in /add route:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/viewCart/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find user and populate cart details
      const user = await User.findById(userId).populate("cart");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json({ cart: user.cart });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Checkout (Clears cart)
  
  
 
  
  // Checkout and create order




// Checkout and create order
router.post("/checkout/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user
    const user = await User.findById(userId).populate("cart");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Generate a unique order number
    const orderNumber = `ORD-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

    // Create new order
    const newOrder = new Order({
      userId: user._id, // Store userId in Order model
      orderNumber,
      customerName: user.name,
      email: user.email,
      paymentStatus: "Pending", // Update if using payment integration
      status: "Processing", // Default order status
      items: user.cart.map((item) => ({ name: item.name, price: item.price })),
      totalAmount: user.cart.reduce((sum, item) => sum + item.price, 0),
    });

    await newOrder.save();

    // Clear user cart
    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/cart/updateQuantity", async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.itemId.toString() === itemId);

    if (item) {
      item.quantity = quantity;
      await cart.save();
      return res.json({ message: "Quantity updated", cart: cart.items });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity", error });
  }
});




export default router;
