import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [userError, setUserError] = useState(null);
  const [orderError, setOrderError] = useState(null);

  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  useEffect(() => {
    if (!userId) {
      setUserError("User not found. Please log in.");
      setLoadingUser(false);
      return;
    }

    // Fetch user details
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/profile/users/${userId}`);
        setUser(userResponse.data);
      } catch (err) {
        setUserError("Failed to load user details. Please try again.");
      } finally {
        setLoadingUser(false);
      }
    };

    // Fetch orders separately
    const fetchOrders = async () => {
      try {
        const ordersResponse = await axios.get(`http://localhost:5000/profile/orders/user/${userId}`);
        setOrders(ordersResponse.data);
      } catch (err) {
        setOrderError("Failed to load orders. Please try again.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchUserData();
    fetchOrders();
  }, [userId]);

  return (
    <div style={styles.container}>
      <Layout />
      <div style={styles.content}>
        <h1 style={styles.heading}>Profile</h1>
        <p style={styles.description}>Manage your account details and view order history.</p>

        {/* Show user data even if orders fail */}
        {loadingUser ? (
          <p style={styles.loading}>Loading profile...</p>
        ) : userError ? (
          <p style={styles.error}>{userError}</p>
        ) : (
          <div style={styles.profileCard}>
            <h2 style={styles.profileName}>{user?.name}</h2>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>City:</strong> {user?.city}</p>
            <p><strong>State:</strong> {user?.state}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Account Created:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
        )}

        {/* Cart Items */}
        {user?.cart?.length > 0 && (
          <>
            <h2 style={styles.subHeading}>Cart Items</h2>
            <div style={styles.cartContainer}>
              {user.cart.map((item) => (
                <div key={item._id} style={styles.cartItem}>
                  <img src={item.imageUrl} alt={item.name} style={styles.cartImage} />
                  <div>
                    <h3>{item.name}</h3>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>Stock:</strong> {item.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Order History */}
        <h2 style={styles.subHeading}>Order History</h2>
        {loadingOrders ? (
          <p style={styles.loading}>Loading orders...</p>
        ) : orderError ? (
          <p style={styles.error}>{orderError}</p>
        ) : orders.length === 0 ? (
          <p>No past orders found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td style={{ color: getStatusColor(order.status), fontWeight: "bold" }}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Helper function to color order statuses
const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "orange";
    case "Completed":
      return "green";
    case "Cancelled":
      return "red";
    default:
      return "black";
  }
};

// Inline CSS Styles
const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  content: {
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
  },
  profileCard: {
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#f1f1f1",
    textAlign: "left",
    marginBottom: "20px",
  },
  profileName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: "20px",
  },
  cartContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  cartImage: {
    width: "80px",
    height: "80px",
    borderRadius: "5px",
    marginRight: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
  },
  loading: {
    fontStyle: "italic",
    color: "#555",
  },
};

export default Profile;
