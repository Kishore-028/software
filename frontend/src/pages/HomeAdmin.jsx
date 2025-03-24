import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./LayoutAdmin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeAdmin = () => {
  const [image, setImage] = useState(null);
  const [menus, setMenus] = useState([]);
  const [menuData, setMenuData] = useState({ name: "", price: "", category: "", stock: "" });
  const [editingMenu, setEditingMenu] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="text-center">
      <Layout />
      <h1>Manage Menus</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <input type="text" name="name" placeholder="Name" value={menuData.name} onChange={handleInputChange} />
      <input type="number" name="price" placeholder="Price" value={menuData.price} onChange={handleInputChange} />
      <input type="text" name="category" placeholder="Category" value={menuData.category} onChange={handleInputChange} />
      <input type="number" name="stock" placeholder="Stock" value={menuData.stock} onChange={handleInputChange} />
      
      {editingMenu ? (
        <button onClick={handleUpdate} disabled={loading}>{loading ? "Updating..." : "Update Menu"}</button>
      ) : (
        <button onClick={handleUpload} disabled={loading}>{loading ? "Adding..." : "Add Menu"}</button>
      )}

      <h2>Menu List</h2>
      {loading && <p>Loading menus...</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {menus.map((menu) => (
          <li
            key={menu._id}
            style={{
              display: "inline-block",
              width: "200px",
              margin: "10px",
              textAlign: "center",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <img
              src={menu.imageUrl.startsWith("http") ? menu.imageUrl : `http://localhost:5000${menu.imageUrl}`}
              alt={menu.name}
              style={{ width: "100px", height: "100px", display: "block", margin: "0 auto 10px" }}
            />
            <h3 style={{ margin: "5px 0" }}>{menu.name}</h3>
            <p style={{ margin: "5px 0" }}>₹ {menu.price}</p>
            <p style={{ margin: "5px 0" }}>Category: {menu.category}</p>
            <p style={{ margin: "5px 0" }}>Stock: {menu.stock}</p>
            <button onClick={() => handleEdit(menu)} disabled={loading} style={{ marginRight: "5px" }}>
              Edit
            </button>
            <button onClick={() => handleDelete(menu._id)} disabled={loading}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeAdmin;
