import { useNavigate } from "react-router-dom";

const LayoutAdmin = ({ handleLogout }) => {
  const navigate = useNavigate();

  const updateURL = (path) => {
    navigate(`/core/admin/${path}`);
  };

  return (
    <div style={{
      backgroundColor: "#fff",
      padding: "15px 20px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "10px",
      marginBottom: "20px",
      marginLeft: "20px",
      marginRight: "20px",
    }}>
      <h1 style={{
        fontSize: "24px",
        fontWeight: "bold",
        margin: 0,
        color: "#333",
      }}>
        Welcome to Kore Connect 
      </h1>
      <br></br>
      <div style={{
        display: "flex",
        gap: "10px",
      }}>
        <button
          onClick={() => updateURL("home")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6B46C1",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#5a3a9f"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#6B46C1"}
        >
          Home
        </button>
        <button
          onClick={() => updateURL("vendormenu")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3182CE",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#2a6ca8"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#3182CE"}
        >
          View Menu
        </button>
        <button
          onClick={() => updateURL("dashboard")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6B46C1",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#5a3a9f"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#6B46C1"}
        >
          Dashboard
        </button>
        <button
          onClick={() => updateURL("analytics")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6B46C1",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#5a3a9f"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#6B46C1"}
        >
          Analytics
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#D69E2E",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#b8860b"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#D69E2E"}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LayoutAdmin;