import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logoContainer}>
          <img src="/logo.jpg" alt="Kore Connect Logo" style={styles.logo} />
          <h1 style={styles.brandName}>Kore Konnect</h1>
        </div>
        <div style={styles.navLinks}>
          <button style={styles.navButton} onClick={() => navigate("/core/home")}>Home</button>
          <button style={styles.navButton} onClick={() => navigate("/core/menu")}>Menu</button>
          <button style={styles.navButton} onClick={() => navigate("/core/contact")}>Contact</button>
          
          {/* Dynamic Login/Logout Button */}
          <button style={styles.navButton} onClick={handleAuthAction}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2 style={styles.welcomeHeading}>Welcome to Kore Konnect</h2>
        <p style={styles.description}>
          Your go-to platform for hassle-free canteen food ordering! Browse the menu, 
          place your order, and enjoy delicious meals without the wait.
        </p>
        <button style={styles.getStartedButton} onClick={() => navigate("/core/login")}>
          Get Started
        </button>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        © 2025 Kore. All rights reserved.
      </footer>
    </div>
  );
};

// Updated Styles
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#F9F7F7",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#112D4E",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  brandName: {
    color: "#FFFFFF",
    fontSize: "22px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  navButton: {
    background: "transparent",
    border: "none",
    color: "#FFFFFF",
    fontSize: "16px",
    cursor: "pointer",
    textTransform: "capitalize",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  },
  mainContent: {
    padding: "50px 20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  welcomeHeading: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#112D4E",
    marginBottom: "20px",
  },
  description: {
    fontSize: "16px",
    color: "#3F72AF",
    marginBottom: "20px",
  },
  getStartedButton: {
    background: "#3F72AF",
    color: "#FFFFFF",
    padding: "12px 25px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  footer: {
    padding: "15px",
    background: "#112D4E",
    color: "#FFFFFF",
    fontSize: "14px",
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default Home;
