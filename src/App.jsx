import './App.css'
import { useState } from "react";
import { Outlet } from "react-router";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    setCartItems(previous => {
      const existingItem = previous.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        return previous.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...previous, { ...item, quantity: 1 }];
    });
  }

  function increaseQuantity(id) {
    setCartItems(previous => previous.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  }

  function decreaseQuantity(id) {
    setCartItems(previous => previous
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)
    );
  }

  return <Outlet context={{ cartItems, addToCart, increaseQuantity, decreaseQuantity }} />;
}

export default App;
