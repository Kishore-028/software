import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logoContainer}>
          <img src="/logo.png" alt="Kore Connect Logo" style={styles.logo} />
          <h1 style={styles.brandName}>Kore Connect</h1>
        </div>
        <div style={styles.navLinks}>
          <button style={styles.navButton} onClick={() => navigate("/core/home")}>Home</button>
          {/* Always Show Login Button */}
          <button style={styles.navButton} onClick={() => navigate("/core/login")}>Login</button>
          <button style={styles.navButton} onClick={() => navigate("/core/signup")}>Signup</button>
          <button style={styles.navButton} onClick={() => navigate("/core/contact")}>Contact</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2 style={styles.welcomeHeading}>Welcome to Kore Connect</h2>
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
        © 2025 Part +-ner Kore. All rights reserved.
      </footer>
    </div>
  );
};

// Styles (unchanged)
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
  },
  logo: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  brandName: {
    color: "white",
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
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  mainContent: {
    padding: "50px 20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  welcomeHeading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
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
