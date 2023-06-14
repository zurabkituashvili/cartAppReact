import React, { useState, useEffect } from "react";
import "./App.css";

const initialItems = [
  {
    id: 1,
    name: "Phone 1",
    price: 100,
    quantity: 1,
    img: "https://www.zdnet.com/a/img/resize/f792d73c3e241b8f40a52875616f490ea1a08e97/2023/04/24/4e586f53-afa2-452d-baf4-cc7c78c2c5fb/samsung-galaxy-a54-5g.jpg?auto=webp&fit=crop&height=1200&width=1200",
  },
  {
    id: 2,
    name: "Phone 2",
    price: 200,
    quantity: 1,
    img: "https://www.vodafone.com.au/images/devices/apple/iphone-14-pro-max/iphone-14-pro-max-deep-purple-feature1-m.jpg",
  },
  {
    id: 3,
    name: "Phone 3",
    price: 300,
    quantity: 1,
    img: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?cs=srgb&dl=pexels-lisa-fotios-1092644.jpg&fm=jpg",
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setItems(initialItems);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setTotal(
      items.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }, [items]);

  const increaseQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setItems(
      items
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity !== 0)
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cart App</h1>
        <div className="cart-icon">
          🛒 <span>{items.length}</span>
        </div>
      </header>
      {items.map((item) => (
        <div key={item.id} className="cart">
          <div className="cart-content">
            <img src={item.img} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>{item.price}$</p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
          <div className="cart-controls">
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <p>{item.quantity}</p>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <p className="total">Total: {total}$</p>
        <button onClick={clearCart} className="clear-cart">
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default App;
