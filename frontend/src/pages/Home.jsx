import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.webp';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="KCT Food Logo" style={styles.logo} />
          <h1 style={styles.brandName}>KCT Food</h1>
        </div>
        <div style={styles.navLinks}>
          <button style={styles.navButton} onClick={() => navigate("/core/home")}>Home</button>
          <button style={styles.navButton} onClick={() => navigate("/core/login")}>Login</button>
          <button style={styles.navButton} onClick={() => navigate("/core/signup")}>Signup</button>
          <button style={styles.navButton} onClick={() => navigate("/core/contact")}>Contact</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2 style={styles.welcomeHeading}>Welcome to KCT Food</h2>
        <p style={styles.description}>
          KCT's premier food ordering platform! Explore our canteen menu, 
          order your favorite meals, and savor the taste of convenience 
          right here at KCT campus.
        </p>
        <button style={styles.getStartedButton} onClick={() => navigate("/core/login")}>
          Order Now
        </button>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        © 2025 KCT Food Ordering System. All rights reserved.
      </footer>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#ff6f61",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px", // Added spacing between logo and text
  },
  logo: {
    width: "40px", // Added specific width
    height: "40px", // Added specific height
    objectFit: "contain", // Ensures logo maintains aspect ratio
  },
  brandName: {
    color: "white",
    fontSize: "22px",
    fontWeight: "bold",
    margin: 0, // Remove default margin
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center", // Ensure buttons align vertically
  },
  navButton: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    textTransform: "capitalize",
    fontWeight: "bold",
    padding: "8px 12px", // Added padding for better click area
  },
  mainContent: {
    padding: "50px 20px",
    maxWidth: "600px",
    margin: "0 auto",
    flex: 1, // Allow main content to take available space
  },
  welcomeHeading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px", // Added spacing
  },
  description: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  getStartedButton: {
    background: "blue",
    color: "white",
    padding: "12px 25px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  footer: {
    padding: "15px",
    background: "#ff6f61",
    color: "white",
    fontSize: "14px",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
};

export default Home;