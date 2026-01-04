import React from 'react';
import { Link } from 'react-router-dom';
import { buttonStyle, cardStyle, containerStyle, iconCircleStyle } from './styles';

const CancelPage: React.FC = () => {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={iconCircleStyle(false)}>✕</div>
        <h1 style={{ color: '#e74c3c', marginBottom: '10px' }}>Payment Canceled</h1>
        <p style={{ color: '#555', lineHeight: '1.5' }}>
          The checkout process was canceled. No funds have been deducted from your account.
        </p>
        <p style={{ marginTop: '10px', color: '#777' }}>Questions? Contact our support team.</p>
        <Link to="/" style={{ ...buttonStyle, backgroundColor: '#34495e' }}>Return to Cart</Link>
      </div>
    </div>
  );
};

export default CancelPage;
