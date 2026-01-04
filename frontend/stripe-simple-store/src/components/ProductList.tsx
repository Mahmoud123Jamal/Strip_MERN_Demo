import type { IProduct } from "../types/product";

interface ProductListProps {
  products: IProduct[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const handleCheckout = async (productId: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("internal server error");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        padding: "20px",
      }}
    >
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
          <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
          <p style={{ fontWeight: "bold", color: "#2ecc71" }}>
            Price: ${product.price}
          </p>

          <button
            onClick={() => handleCheckout(product._id)}
            style={{
              backgroundColor: "#6772e5",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Buy Now!
          </button>
        </div>
      ))}
    </div>
  );
};
