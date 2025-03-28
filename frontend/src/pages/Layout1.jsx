import { useNavigate } from "react-router-dom";

const Layout1 = ({ children }) => {
  const navigate = useNavigate();

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
    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f5f5f7", // Light gray background for the page
    }}>
      {/* Vertical Sidebar */}
      <div style={{
        width: "200px",
        backgroundColor: "#2c3e50", // Dark background for the sidebar
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      }}>
        <button
          onClick={() => updateURL("profile")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6B46C1", // Purple for "Profile"
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            textAlign: "left",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#5a3a9f"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#6B46C1"}
        >
          Profile
        </button>
        <button
          onClick={() => updateURL("home")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6B46C1", // Purple for "Home"
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            textAlign: "left",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#5a3a9f"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#6B46C1"}
        >
          Home
        </button>
        <button
          onClick={() => updateURL("menu")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3182CE", // Blue for "Menu"
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            textAlign: "left",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#2a6ca8"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#3182CE"}
        >
          Menu
        </button>
        <button
          onClick={() => updateURL("cart")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#D69E2E", 
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            textAlign: "left",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#b8860b"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#D69E2E"}
        >
          Cart
        </button>
        <button
          onClick={() => updateURL("order-tracking")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#D69E2E", 
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            textAlign: "left",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#b8860b"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#D69E2E"}
        >
          Track Orders
        </button>
        
        
      </div>
      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: "20px",
      }}>
        {children}
      </div>
    </div>
  );
};

export default Layout1;