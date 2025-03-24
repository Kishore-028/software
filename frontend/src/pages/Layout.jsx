import { useNavigate } from "react-router-dom";

const HomeUser = () => {
  const navigate = useNavigate();

  // Function to navigate and update the URL dynamically
  const updateURL = (path) => {
    navigate(`/core/user/${path}`);
  };

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");  
    sessionStorage.clear();
  
    // Navigate to home and replace history
    navigate("/core/home", { replace: true });
  
    // Prevent going back after logout
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", function () {
      navigate("/core/home", { replace: true });
    });
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Kore Connect</h1>
      <p style={styles.subText}>Explore your menu, manage your cart, and track orders easily.</p>

      {/* Quick Links Section */}
      <div style={styles.buttonContainer}>
        <button onClick={() => updateURL("menu")} style={{ ...styles.buttonBase, ...styles.blueButton }}>
          View Menu
        </button>
        <button onClick={() => updateURL("cart")} style={{ ...styles.buttonBase, ...styles.greenButton }}>
          My Cart
        </button>
        <button onClick={() => updateURL("profile")} style={{ ...styles.buttonBase, ...styles.purpleButton }}>
          Profile
        </button>
        <button onClick={() => updateURL("order-tracking")} style={{ ...styles.buttonBase, ...styles.yellowButton }}>
          Track Orders
        </button>
        <button onClick={handleLogout} style={{ ...styles.buttonBase, ...styles.yellowButton }}>
          Logout
        </button>
      </div>
    </div>
  );
};

// Styles Object
const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  subText: {
    fontSize: "18px",
    color: "gray",
    marginTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
    flexWrap: "wrap", // Ensures buttons wrap on smaller screens
  },
  buttonBase: {
    color: "white",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    transition: "background 0.3s",
  },
  blueButton: {
    backgroundColor: "#3182CE",
  },
  greenButton: {
    backgroundColor: "#38A169",
  },
  purpleButton: {
    backgroundColor: "#6B46C1",
  },
  yellowButton: {
    backgroundColor: "#D69E2E",
  },
};

export default HomeUser;
