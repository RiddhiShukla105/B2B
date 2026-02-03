import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';

createRoot(document.getElementById('root')).render(
  <CartProvider>
  <WishlistProvider>
  <StrictMode>
   <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD", // or INR if enabled
        intent: "capture",
      }}
    >
    <App />
    </PayPalScriptProvider>
  </StrictMode>
  </WishlistProvider>
  </CartProvider>,
)
