import { useState, useEffect } from "react";
import Layout from "./Layout";
import Lay from "./Layout1";

const HomeUser = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [todaySpecial, setTodaySpecial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/menus/getmenu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();

        // Shuffle and select random menu items
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selectedItems = shuffled.slice(0, 3);
        setMenuItems(selectedItems);

        // Select a random item for Today's Special
        setTodaySpecial(shuffled[0] || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Fallback placeholder image URL
  const placeholderImage = "https://via.placeholder.com/300x200?text=Image+Placeholder";

  // Function to construct the image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return placeholderImage;
    // Check if imageUrl is already a full URL
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }
    // If it's a relative path, prepend the base URL
    return `http://localhost:5000${imageUrl}`;
  };

  const styles = {
    container: {
      textAlign: "center",
      marginTop: "40px",
      padding: "0 20px",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#1d1d1f",
      marginBottom: "10px",
    },
    subText: {
      fontSize: "16px",
      color: "#6e6e73",
      marginBottom: "40px",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "600",
      margin: "40px 0 20px",
      color: "#1d1d1f",
      textAlign: "center",
    },
    specialCard: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      margin: "0 auto",
      maxWidth: "400px", // Adjusted to match the image
      textAlign: "left",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      ":hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
      },
    },
    specialImage: {
      width: "100%",
      height: "150px", // Adjusted to match the image
      borderRadius: "8px",
      objectFit: "cover",
      marginBottom: "15px",
    },
    specialName: {
      fontSize: "18px", // Adjusted to match the image
      fontWeight: "600",
      color: "#1d1d1f",
      marginBottom: "10px",
    },
    specialPrice: {
      fontSize: "16px", // Adjusted to match the image
      fontWeight: "500",
      color: "#1d1d1f", // Black to match the image
    },
    menuContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
      marginTop: "20px",
    },
    menuCard: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      padding: "15px",
      width: "300px",
      textAlign: "left",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      ":hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
    },
    menuImage: {
      width: "100%",
      height: "150px",
      borderRadius: "8px",
      objectFit: "cover",
      marginBottom: "10px",
    },
    menuName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1d1d1f",
      marginBottom: "8px",
    },
    menuPrice: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#1d1d1f", // Black to match the image
    },
    loadingText: {
      fontSize: "18px",
      color: "#6e6e73",
      marginTop: "20px",
    },
    errorText: {
      fontSize: "18px",
      color: "#e74c3c",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <Layout />
    <Lay>
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome to Kore Connect</h1>
        <p style={styles.subText}>Explore your menu, manage your cart, and track orders easily.</p>

        {/* Today's Special Section */}
        <h2 style={styles.sectionTitle}>Today's Special</h2>
        {loading ? (
          <p style={styles.loadingText}>Loading...</p>
        ) : error ? (
          <p style={styles.errorText}>{error}</p>
        ) : todaySpecial ? (
          <div style={styles.specialCard}>
            <img
              src={getImageUrl(todaySpecial.imageUrl)}
              alt={todaySpecial.name}
              style={styles.specialImage}
              onError={(e) => (e.target.src = placeholderImage)}
            />
            <h3 style={styles.specialName}>{todaySpecial.name}</h3>
            <p style={styles.specialPrice}>${todaySpecial.price.toFixed(2)}</p>
          </div>
        ) : (
          <p style={styles.errorText}>No special item available today.</p>
        )}

        {/* Menu Section */}
        <h2 style={styles.sectionTitle}>Explore Our Menu</h2>
        {loading ? (
          <p style={styles.loadingText}>Loading...</p>
        ) : error ? (
          <p style={styles.errorText}>{error}</p>
        ) : menuItems.length > 0 ? (
          <div style={styles.menuContainer}>
            {menuItems.map((item) => (
              <div key={item._id} style={styles.menuCard}>
                <img
                  src={getImageUrl(item.imageUrl)}
                  alt={item.name}
                  style={styles.menuImage}
                  onError={(e) => (e.target.src = placeholderImage)}
                />
                <h3 style={styles.menuName}>{item.name}</h3>
                <p style={styles.menuPrice}>${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.errorText}>No menu items available.</p>
        )}
      </div>
    </Lay>
    </div>
  );
};

export default HomeUser;