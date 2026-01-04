import React, { useEffect, useState } from "react";
import type { IProduct } from "./types/product";
import { ProductList } from "./components/ProductList";

const App: React.FC = () => {
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

  if (loading) return <p>loading...</p>;

  return (
    <div className="container">
      <h1>Stripe demo store</h1>

      <ProductList products={products} />
    </div>
  );
};

export default App;
