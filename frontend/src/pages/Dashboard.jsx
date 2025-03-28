import { useState, useEffect } from "react";
import Layout from "./LayoutAdmin";

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f5f5f7", // Light gray background for a clean look
    paddingTop: "2rem",
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", // Modern typography
  },
  contentWrapper: {
    width: "90%",
    maxWidth: "1000px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    borderRadius: "10px", // Rounded corners as in the image
    padding: "2rem",
    marginTop: "1.5rem",
    marginBottom: "2rem",
    transition: "box-shadow 0.3s ease", // Smooth hover effect
    ":hover": {
      boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.12)", // Enhanced shadow on hover
    },
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    color: "#1d1d1f", // Dark text for contrast
    textAlign: "center",
    letterSpacing: "-0.5px", // Slight letter spacing for elegance
  },
  orderList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  orderCard: {
    border: "1px solid #e8ecef", // Light border as in the image
    padding: "1.5rem",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)", // Subtle shadow
    transition: "all 0.3s ease-in-out", // Smooth transitions
    ":hover": {
      transform: "translateY(-4px)", // Lift effect on hover
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Enhanced shadow on hover
      borderColor: "#d2d6dc", // Slight border color change
    },
  },
  orderText: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1d1d1f", // Dark text for readability
    marginBottom: "0.5rem",
  },
  statusText: {
    fontSize: "1rem",
    color: "#6e6e73", // Muted gray for secondary text
    marginBottom: "0.5rem",
  },
  link: {
    fontSize: "0.875rem",
    color: "#007aff", // Apple’s blue for links
    textDecoration: "none",
    cursor: "pointer",
    marginTop: "0.5rem",
    display: "inline-block",
    fontWeight: "500",
    transition: "color 0.2s ease", // Smooth color transition
    ":hover": {
      color: "#005bb5", // Darker blue on hover
      textDecoration: "underline", // Underline on hover
    },
  },
  noOrdersText: {
    textAlign: "center",
    color: "#6e6e73", // Muted text color
    fontSize: "1rem",
    padding: "2rem 0",
  },
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    window.location.href = "/core/home";
  };

  return (
    <div style={styles.pageContainer}>
      <Layout handleLogout={handleLogout} />
      <div style={styles.contentWrapper}>
        <h1 style={styles.title}>Order Management Dashboard</h1>
        <div style={styles.orderList}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} style={styles.orderCard}>
                <h2 style={styles.orderText}>Order #{order.orderNumber}</h2>
                <p style={styles.statusText}>Status: {order.status}</p>
                <a href={`/core/admin/order/${order._id}`} style={styles.link}>
                  View Details
                </a>
              </div>
            ))
          ) : (
            <p style={styles.noOrdersText}>No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;