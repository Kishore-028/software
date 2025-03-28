import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    // Redirect to the home page
    navigate("/core/home", { replace: true });
    // Prevent back navigation
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", function () {
      navigate("/core/home", { replace: true });
    });
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        backgroundColor: "#2c3e50", // Dark background to match previous designs
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}>
        <h1 style={{
          fontSize: "24px",
          fontWeight: "bold",
          margin: 0,
          color: "#fff", // White text for contrast
        }}>
          Welcome to Kore Connect
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#e74c3c", // Red for the "Logout" button
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#c0392b"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#e74c3c"}
        >
          Logout
        </button>
      </div>
      {/* Render child components */}
      {children}
    </div>
  );
};

export default Layout;