import { useEffect, useState } from "react";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalMenus: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/analytics");
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
          <h3>Total Menus</h3>
          <p className="text-2xl">{analytics.totalMenus}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <h3>Total Orders</h3>
          <p className="text-2xl">{analytics.totalOrders}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
          <h3>Total Users</h3>
          <p className="text-2xl">{analytics.totalUsers}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow">
          <h3>Total Revenue</h3>
          <p className="text-2xl">₹{analytics.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
