import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  buttonStyle,
  cardStyle,
  containerStyle,
  iconCircleStyle,
  idBoxStyle,
} from "./styles";

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={iconCircleStyle(true)}>✓</div>
        <h1 style={{ color: "#2ecc71", marginBottom: "10px" }}>
          Payment Successful!
        </h1>
        <p style={{ color: "#555", lineHeight: "1.5" }}>
          Thank you for your purchase. Your order is being processed and a
          confirmation email is on its way.
        </p>
        {sessionId && (
          <div style={idBoxStyle}>
            <strong>Order ID:</strong>
            <span style={{ fontSize: "12px", marginLeft: "5px" }}>
              {sessionId}
            </span>
          </div>
        )}
        <Link to="/" style={buttonStyle}>
          Back to Store
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
