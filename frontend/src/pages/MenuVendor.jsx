import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./LayoutAdmin";

const categories = ["All", "Vegetarian", "Non-Vegetarian", "Desserts"];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [images, setImages] = useState([]);

  // Fetch menu items from MongoDB (backend)
  useEffect(() => {
    axios
      .get("http://localhost:5000/menus/getmenu") // Replace with your actual API URL
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });

    // Fetch images from the backend
    axios
      .get("http://localhost:5000/images")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  // Function to get the image URL
  const getImageUrl = (imageUrl) => {
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    return `http://localhost:5000${imageUrl}`;
  };
  const fetchMenus = async () => {
    try {
        const response = await axios.get("http://localhost:5000/menus");
        console.log("Menus fetched successfully:", response.data);
    } catch (error) {
        console.error("Error fetching menus:", error);
    }
};

  // Filter menu items based on category and search query
  const filteredItems = menuItems.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <Layout />
      <div style={styles.content}>
        <h1 style={styles.heading}>Canteen Menu</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for meals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />

        {/* Category Filters */}
        <div style={styles.filterContainer}>
          <span style={styles.filterLabel}>Filter by Category:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                ...styles.filterButton,
                backgroundColor:
                  selectedCategory === category ? "#d1d5db" : "#f3f4f6",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div style={styles.grid}>
          {filteredItems.map((item) => (
            <div key={item._id} style={styles.card}>
              <img src={getImageUrl(item.imageUrl)} alt={item.name} style={styles.image} />
              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>
              <p>Category: {item.category}</p>
              <p>Stock: {item.stock}</p>
              <button style={styles.cartButton}>Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Images Grid */}
        <div style={styles.imagesGrid}>
          {images.map((image) => (
            <div key={image._id} style={styles.imageCard}>
              <img src={getImageUrl(image.imageUrl)} alt="Uploaded" style={styles.uploadedImage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    paddingTop: "20px",
  },
  content: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "20px",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  searchBar: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  filterLabel: {
    fontWeight: "bold",
  },
  filterButton: {
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  cartButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  imagesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  imageCard: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  },
  uploadedImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
  },
};

export default Menu;
