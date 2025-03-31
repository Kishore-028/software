import { useNavigate } from "react-router-dom";

const LayoutAdmin = ({ handleLogout, children }) => {
  const navigate = useNavigate();

  const updateURL = (path) => {
    navigate(`/core/admin/${path}`);
  };

  return (
    <div style={layoutStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <h2 style={logoStyle}>🍽️ Food</h2>
        <ul style={navListStyle}>
          <li onClick={() => updateURL("home")} style={navItemStyle}>
            Home
          </li>
          <li onClick={() => updateURL("vendormenu")} style={navItemStyle}>
            Menu
          </li>
          <li onClick={() => updateURL("dashboard")} style={navItemStyle}>
            Dashboard
          </li>
          <li onClick={() => updateURL("analytics")} style={navItemStyle}>
            Analytics
          </li>
          <li onClick={handleLogout} style={logoutStyle}>
            Logout
          </li>
        </ul>
      </aside>

      {/* Content */}
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

// Updated Styles
const layoutStyle = {
  display: "flex",
  flexDirection: "row",
  minHeight: "100vh", // Use minHeight instead of fixed height to allow the container to grow
};

const sidebarStyle = {
  width: "250px",
  backgroundColor: "#2C3E50",
  color: "#fff",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const navListStyle = {
  listStyle: "none",
  padding: 0,
  width: "100%",
};

const navItemStyle = {
  padding: "10px",
  cursor: "pointer",
  color: "#BDC3C7",
  textAlign: "center",
  borderRadius: "5px",
  marginBottom: "10px",
  transition: "background 0.3s",
};

const logoutStyle = {
  ...navItemStyle,
  backgroundColor: "#E74C3C",
  color: "#fff",
};

const contentStyle = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#F4F6F7",
  minHeight: "100vh", // Ensures the content area is at least as tall as the viewport
};

export default LayoutAdmin;
