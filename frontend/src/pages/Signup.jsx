import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    state: "",
    role: "",
  });

  const [error, setError] = useState(null); // State for error messages
  const { name, email, password, phone, city, state, role } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const response = await axios.post("/auth/signup", { name, email, password, phone, city, state, role });
      alert(response.data.message);
      navigate("/core/login");  
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Something went wrong.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #74b9ff, #0984e3)",
      padding: "20px",
    },
    formBox: {
      background: "#fff",
      padding: "35px",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
      width: "400px",
      textAlign: "center",
    },
    title: {
      marginBottom: "20px",
      color: "#333",
      fontSize: "26px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      border: "2px solid #ddd",
      borderRadius: "8px",
      fontSize: "16px",
    },
    select: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      border: "2px solid #ddd",
      borderRadius: "8px",
      fontSize: "16px",
      background: "#fff",
    },
    button: {
      width: "100%",
      padding: "14px",
      background: "#0984e3",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.3s",
      marginTop: "10px",
    },
    link: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#0984e3",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>Create Your Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={onChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={onChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={onChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={onChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={state}
            onChange={onChange}
            required
            style={styles.input}
          />
          <select name="role" value={role} onChange={onChange} required style={styles.select}>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/core/login" style={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
