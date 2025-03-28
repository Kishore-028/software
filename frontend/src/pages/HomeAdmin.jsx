import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeAdmin = () => {
  const [image, setImage] = useState(null);
  const [menus, setMenus] = useState([]);
  const [menuData, setMenuData] = useState({ name: "", price: "", category: "", stock: "" });
  const [editingMenu, setEditingMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/menus/getmenu");
      setMenus(response.data);
    } catch (error) {
      console.error("Error fetching menus:", error);
      toast.error("Failed to fetch menus");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    setMenuData({ ...menuData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (!image) {
      toast.error("Please select an image first.");
      return;
    }

    if (!menuData.name || !menuData.price || !menuData.category || !menuData.stock) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", menuData.name);
    formData.append("price", menuData.price);
    formData.append("category", menuData.category);
    formData.append("stock", menuData.stock);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/menus/addmenu", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Menu added successfully!");
      fetchMenus();
      setMenuData({ name: "", price: "", category: "", stock: "" });
      setImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/menus/${id}`);
      fetchMenus();
      toast.success("Menu deleted successfully!");
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast.error("Failed to delete menu");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setMenuData({ name: menu.name, price: menu.price, category: menu.category, stock: menu.stock });
  };

  const handleUpdate = async () => {
    if (!editingMenu) return;
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/menus/${editingMenu._id}`, menuData);
      fetchMenus();
      setEditingMenu(null);
      setMenuData({ name: "", price: "", category: "", stock: "" });
      toast.success("Menu updated successfully!");
    } catch (error) {
      console.error("Error updating menu:", error);
      toast.error("Failed to update menu");
    } finally {
      setLoading(false);
    }
  };

  const updateURL = (path) => {
    navigate(`/core/admin/${path}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/core/home", { replace: true });
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", function () {
      navigate("/core/home", { replace: true });
    });
  };

  const styles = `
    @media (max-width: 768px) {
      .sidebar {
        width: 200px !important;
      }
      .main-content {
        padding: 15px !important;
      }
      .form-section, .menu-list-section {
        padding: 15px !important;
      }
      table {
        font-size: 12px !important;
      }
      img {
        width: 40px !important;
        height: 40px !important;
      }
    }

    @media (max-width: 480px) {
      .sidebar {
        width: 100% !important;
        position: static !important;
      }
      .main-content {
        padding: 10px !important;
      }
      .form-section, .menu-list-section {
        padding: 10px !important;
      }
      table {
        font-size: 10px !important;
      }
      img {
        width: 30px !important;
        height: 30px !important;
      }
    }
  `;

  return (
    <div>
      <style>{styles}</style>
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
        {/* Sidebar */}
        <div className="sidebar" style={{
          width: "250px",
          backgroundColor: "#2c3e50",
          color: "#fff",
          padding: "20px",
          boxSizing: "border-box",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
            <svg style={{ width: "30px", height: "30px", fill: "#f39c12", marginRight: "10px" }} viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14h-1v6l5.2 3.2.8-1.3-4-2.6V6z" />
            </svg>
            <h2 style={{ fontSize: "20px", margin: 0 }}>Food</h2>
          </div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li
              style={{
                padding: "10px 15px",
                backgroundColor: "#f39c12",
                borderRadius: "5px",
                marginBottom: "10px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => updateURL("home")}
            >
              Home
            </li>
            <li
              style={{ padding: "10px 15px", color: "#bdc3c7", marginBottom: "10px", cursor: "pointer" }}
              onClick={() => updateURL("vendormenu")}
            >
              Menu
            </li>
            <li
              style={{ padding: "10px 15px", color: "#bdc3c7", marginBottom: "10px", cursor: "pointer" }}
              onClick={() => updateURL("dashboard")}
            >
              Dashboard
            </li>
            <li
              style={{ padding: "10px 15px", color: "#bdc3c7", marginBottom: "10px", cursor: "pointer" }}
              onClick={() => updateURL("analytics")}
            >
              Analytics
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content" style={{
          flex: 1,
          backgroundColor: "#f5f7fa",
          padding: "20px",
          boxSizing: "border-box",
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: "#2c3e50",
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
              color: "#fff",
            }}>
              Welcome to Kore Connect
            </h1>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                backgroundColor: "#e74c3c",
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

          {/* Form Section */}
          <div className="form-section" style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px", color: "#333" }}>
              {editingMenu ? "Edit Menu" : "Add New Menu"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: "14px",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                }}
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={menuData.name}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: "14px",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                }}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={menuData.price}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: "14px",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                }}
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={menuData.category}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: "14px",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                }}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={menuData.stock}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: "14px",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                }}
              />
              {editingMenu ? (
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f39c12",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#e67e22"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#f39c12"}
                >
                  {loading ? "Updating..." : "Update Menu"}
                </button>
              ) : (
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f39c12",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#e67e22"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#f39c12"}
                >
                  {loading ? "Adding..." : "Add Menu"}
                </button>
              )}
            </div>
          </div>

          {/* Menu List Section */}
          <div className="menu-list-section" style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px", color: "#333" }}>
              Menu List
            </h2>
            {loading && <p style={{ color: "#666", textAlign: "center" }}>Loading menus...</p>}
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
                color: "#333",
              }}>
                <thead>
                  <tr style={{ backgroundColor: "#f39c12", color: "#fff" }}>
                    <th style={{ padding: "10px", textAlign: "left" }}>Image</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Category</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Stock</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menus.map((menu) => (
                    <tr key={menu._id} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "10px" }}>
                        <img
                          src={menu.imageUrl.startsWith("http") ? menu.imageUrl : `http://localhost:5000${menu.imageUrl}`}
                          alt={menu.name}
                          style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                        />
                      </td>
                      <td style={{ padding: "10px" }}>{menu.name}</td>
                      <td style={{ padding: "10px" }}>₹ {menu.price}</td>
                      <td style={{ padding: "10px" }}>{menu.category}</td>
                      <td style={{ padding: "10px" }}>{menu.stock}</td>
                      <td style={{ padding: "10px" }}>
                        <button
                          onClick={() => handleEdit(menu)}
                          disabled={loading}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#3498db",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            marginRight: "5px",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "background-color 0.3s",
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = "#2980b9"}
                          onMouseOut={(e) => e.target.style.backgroundColor = "#3498db"}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(menu._id)}
                          disabled={loading}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#e74c3c",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "background-color 0.3s",
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = "#c0392b"}
                          onMouseOut={(e) => e.target.style.backgroundColor = "#e74c3c"}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;