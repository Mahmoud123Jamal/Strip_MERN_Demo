import React, { useEffect, useState } from "react";
import type { IProduct } from "./types/product";
import { ProductList } from "./components/ProductList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SuccessPage from "./pages/Success";
import CancelPage from "./pages/Cancel";

// --- 1. THE VIEW COMPONENT ---
// Move all your state and fetching logic here.
const StoreFront: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        const json = await response.json();
        if (json.status === "success") {
          setProducts(json.data.products);
        }
      } catch (error) {
        console.error("fail fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Loading store...</p>
    );
  }

  return (
    <div className="container">
      <h1>Stripe demo store</h1>
      <ProductList products={products} />
    </div>
  );
};

// --- 2. THE ROUTER DEFINITION ---
// This MUST be outside the App component so it is stable and created only once.
const router = createBrowserRouter([
  {
    path: "/",
    element: <StoreFront />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
  {
    path: "/cancel",
    element: <CancelPage />,
  },
]);

// --- 3. THE ROOT APP COMPONENT ---
// This simply provides the router to the rest of the application.
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
