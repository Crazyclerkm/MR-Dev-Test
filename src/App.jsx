import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Product from './components/Product';

function App() {
  // Initialise empty cart
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cart.reduce((count, product) => count + product.amount, 0));
  }, [cart]);

  // Callback function to add a product to the cart
  function addToCart(newProduct, sizeOption) {
    // Create a deep copy of the product to be added
    // NOTE: Will only be correct while all properties of the product data are serialisable
    // however this should be the case as we are retrieving it as JSON from the api
    const selectedProduct = JSON.parse(JSON.stringify(newProduct));

    // Set the size option to the selected size
    selectedProduct.sizeOptions = sizeOption.label;

    setCart((prevCart) => {
      const findItemIndex = prevCart.findIndex(
        (product) => 
          product.id = selectedProduct.id &&
          product.sizeOptions == selectedProduct.sizeOptions
      );

      // If the product is already in the cart with the selected size option then increase the amount
      // otherwise add it to the cart
      if (findItemIndex != -1) {
        const updatedCart = [...prevCart];
        updatedCart[findItemIndex].amount += 1;
        return updatedCart;
      } else {
        return [...prevCart, {...selectedProduct, amount: 1}]
      }
    });
  }

  function updateAmount(index, newAmount) {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];

      // If we update the amount of a product in cart to 0, remove the product from the cart
      if (newAmount == 0) {
        updatedCart.splice(index,1);
        return updatedCart;
      } else {
        updatedCart[index] = {
          ...updatedCart[index],
          amount: newAmount,
        };
      }
      return updatedCart;
    });
  }

  return (
    <>
      <Header cart={cart} cartCount={cartCount} updateAmount={updateAmount}/>
      <Product productID="1" addToCart={addToCart}/>
    </>
  )
}

export default App;