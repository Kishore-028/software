import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";  // Ensure this path is correct

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cart/viewCart/${userId}`);
        
        // Ensure each item has a quantity property (default to 1 if missing)
        const updatedCart = response.data.cart.map(item => ({
          ...item,
          quantity: item.quantity || 1
        }));

        setCartItems(updatedCart);
        calculateTotal(updatedCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const calculateTotal = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      );

      calculateTotal(updatedItems); // Recalculate total after updating quantity
      return updatedItems;
    });
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/cart/checkout/${userId}`);
      const orderData = response.data.order;

      localStorage.setItem("orderDetails", JSON.stringify(orderData));

      alert("Checkout successful!");
      navigate("/core/user/order-success");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <Layout /> {/* Keeping Layout at the top */}
      <div style={styles.container}>
        <h2 style={styles.title}>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p style={styles.emptyMessage}>Your cart is empty.</p>
        ) : (
          <>
            <div style={styles.cartList}>
              {cartItems.map((item) => (
                <div key={item._id} style={styles.cartItem}>
                  <img src={item.imageUrl} alt={item.name} style={styles.image} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>₹ {item.price} x {item.quantity} = ₹ {item.price * item.quantity}</p>
                    <div style={styles.quantityControl}>
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        style={styles.quantityButton}
                      >
                        -
                      </button>
                      <span style={styles.quantity}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3 style={styles.totalPrice}>Total: ₹ {totalPrice}</h3>
            <button onClick={handleCheckout} style={styles.checkoutButton}>
              Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  emptyMessage: {
    fontSize: "18px",
    color: "gray",
  },
  cartList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    width: "60%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "5px",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  quantityButton: {
    padding: "5px 10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  quantity: {
    fontSize: "16px",
  },
  totalPrice: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "20px 0",
  },
  checkoutButton: {
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Cart;
