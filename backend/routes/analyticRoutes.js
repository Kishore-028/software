import express from "express";
import Menu from "../models/Menu.js"; // Adjust paths as needed
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/analytics", async (req, res) => {
  try {
    const totalMenus = await Menu.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    res.json({
      totalMenus,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
