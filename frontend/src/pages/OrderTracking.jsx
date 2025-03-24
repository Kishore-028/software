import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
        if (!userId) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/orders/userOrder/${userId}`);
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={styles.container}>
      <Layout />
      <div style={styles.content}>
        <h1 style={styles.heading}>Track Your Order</h1>
        <p style={styles.description}>Check the status of your order in real-time.</p>

        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {orders.length === 0 && !loading && <p>No orders found.</p>}

        <div style={styles.orderList}>
          {orders.map((order) => (
            <div key={order._id} style={styles.orderCard}>
              <h3>Order # {order.orderNumber}</h3>
              <p><strong>Name:</strong> {order.customerName}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              
              <p style={{ ...styles.status, backgroundColor: getStatusColor(order.status) }}>
                <strong>Status:</strong> {order.status}
              </p>

              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} - ${item.price}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Function to determine background color based on order status
const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#FFA500"; // Orange
    case "Processing":
      return "#17a2b8"; // Blue
    case "Completed":
      return "#28a745"; // Green
    case "Cancelled":
      return "#dc3545"; // Red
    default:
      return "#6c757d"; // Grey
  }
};

// Inline CSS Styles
const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    paddingTop: "20px",
  },
  content: {
    marginTop: "20px",
    padding: "20px",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: "1.2rem",
    color: "#555",
    marginTop: "10px",
  },
  orderList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: "15px",
    margin: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    width: "80%",
    maxWidth: "600px",
    textAlign: "left",
  },
  status: {
    fontWeight: "bold",
    color: "#fff",
    padding: "5px",
    borderRadius: "5px",
    display: "inline-block",
    marginTop: "10px",
  },
};

export default OrderTracking;
