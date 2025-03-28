import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Menu from "../models/Menus.js";

const router = express.Router();

router.get("/analytics", async (req, res) => {
  try {
    // Total Users
    const totalUsers = await User.countDocuments();

    // Total Menus
    const totalMenus = await Menu.countDocuments();

    // Total Orders and Total Revenue
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Orders by Status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Best Selling Items
    const bestSellingItems = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.name", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Orders by Payment Status (count)
    const ordersByPaymentStatus = await Order.aggregate([
      { $group: { _id: "$paymentStatus", count: { $sum: 1 } } },
    ]);

    // Total Amount by Payment Status
    const totalAmountByPaymentStatus = await Order.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Menu by Category
    const menuByCategory = await Menu.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // Revenue Over Time (daily for the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const revenueOverTime = await Order.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", revenue: 1, _id: 0 } },
    ]);

    res.json({
      totalMenus,
      totalOrders,
      totalUsers,
      totalRevenue,
      ordersByStatus,
      bestSellingItems,
      ordersByPaymentStatus,
      totalAmountByPaymentStatus,
      menuByCategory,
      revenueOverTime,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
