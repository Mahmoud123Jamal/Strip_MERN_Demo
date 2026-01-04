export const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
};

export const cardStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "40px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  maxWidth: "450px",
  width: "90%",
};

export const iconCircleStyle = (isSuccess: boolean): React.CSSProperties => ({
  fontSize: "40px",
  color: isSuccess ? "#2ecc71" : "#e74c3c",
  marginBottom: "20px",
  border: `4px solid ${isSuccess ? "#2ecc71" : "#e74c3c"}`,
  borderRadius: "50%",
  width: "70px",
  height: "70px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const buttonStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: "30px",
  padding: "12px 32px",
  backgroundColor: "#6772e5", // Stripe Brand Color
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "600",
  transition: "transform 0.2s ease",
};

export const idBoxStyle: React.CSSProperties = {
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "#f1f3f5",
  borderRadius: "4px",
  wordBreak: "break-all",
};
