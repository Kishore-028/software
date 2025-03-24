import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

const categories = ["All", "Vegetarian", "Non-Vegetarian", "Desserts"];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/menus/getmenu")
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Error fetching menu data:", error));
  }, []);

  const getImageUrl = (imageUrl) =>
    imageUrl.startsWith("http") ? imageUrl : `http://localhost:5000${imageUrl}`;

  const handleQuantityChange = (itemId, delta) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[itemId] || 0) + delta;
      return newQuantity > 0
        ? { ...prevQuantities, [itemId]: newQuantity }
        : prevQuantities;
    });
  };

  const addToCart = async (itemId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in first.");
        return;
      }

      const quantity = quantities[itemId] || 1;

      await axios.post("http://localhost:5000/cart/add", {
        userId,
        itemId,
        quantity,
      });

      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  const filteredItems = menuItems.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Layout />
      <h1>Canteen Menu</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <div>
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredItems.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <img
              src={getImageUrl(item.imageUrl)}
              alt={item.name}
              style={{ width: "100%", height: "150px" }}
            />
            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>
            <div>
              <button
                onClick={() => handleQuantityChange(item._id, -1)}
                style={{ marginRight: "5px" }}
              >
                -
              </button>
              <span>{quantities[item._id] || 1}</span>
              <button
                onClick={() => handleQuantityChange(item._id, 1)}
                style={{ marginLeft: "5px" }}
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(item._id)}
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px",
                marginTop: "10px",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
