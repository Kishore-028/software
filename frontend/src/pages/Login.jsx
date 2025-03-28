import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Using regular axios for direct debugging

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setDebugInfo(null);

    if (!email || !password || !role) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const payload = {
      email,
      password,
      role,
    };

    setDebugInfo({ message: "Attempting login with payload", payload });

    try {
      const response = await axios.post("http://localhost:5000/auth/login", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setDebugInfo((prev) => ({ ...prev, response: response.data }));

      const { token, user } = response.data;

      localStorage.setItem("userId", user.id);
      localStorage.setItem("token", token);

      setIsAuthenticated(true);
      

      if (role === "admin") {
        navigate("/core/admin/home");
      } else {
        navigate("/core/user/home");
      }
    } catch (error) {
      console.error("Login Failed:", error);
      const errorResponse = {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      };

      setDebugInfo((prev) => ({ ...prev, error: errorResponse }));
      setError(error.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login to Your Account</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          autoFocus
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          style={styles.input}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required style={styles.select}>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>Don't have an account?</p>
      <button onClick={() => navigate("/core/signup")} style={styles.signupButton}>
        Sign Up
      </button>

      {debugInfo && (
        <div style={styles.debugBox}>
          <h3>Debug Information</h3>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  signupButton: {
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
  },
  debugBox: {
    marginTop: "20px",
    padding: "10px",
    background: "#f5f5f5",
    borderRadius: "5px",
    textAlign: "left",
    width: "80%",
    maxWidth: "400px",
  },
};

export default Login;
