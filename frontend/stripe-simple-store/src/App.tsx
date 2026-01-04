import React, { useEffect, useState } from "react";
import type { IProduct } from "./types/product";
import { ProductList } from "./components/ProductList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SuccessPage from "./pages/Success";
import CancelPage from "./pages/Cancel";

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
      <h1 style={{ textAlign: "center" }}>Stripe demo store</h1>
      <ProductList products={products} />
    </div>
  );
};

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

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
