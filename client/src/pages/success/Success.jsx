import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  // Styling dalam inline styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  };

  const messageBoxStyle = {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    transition: "transform 0.3s ease-in-out",
  };

  const headingStyle = {
    fontSize: "28px",
    color: "#2a9d8f",
    marginBottom: "20px",
    fontWeight: "bold",
    textTransform: "uppercase",
  };

  const paragraphStyle = {
    fontSize: "18px",
    color: "#333",
    lineHeight: "1.6",
    marginBottom: "15px",
  };

  const loadingTextStyle = {
    fontSize: "16px",
    color: "#6c757d",
    marginTop: "20px",
    fontStyle: "italic",
  };

  // Responsif dengan media query
  const mobileStyle = {
    "@media (max-width: 600px)": {
      messageBoxStyle: {
        padding: "25px",
        width: "90%",
      },
      headingStyle: {
        fontSize: "22px",
      },
      paragraphStyle: {
        fontSize: "16px",
      },
      loadingTextStyle: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div style={containerStyle}>
      <div style={messageBoxStyle}>
        <h1 style={headingStyle}>Pembayaran Berhasil</h1>
        <p style={paragraphStyle}>
          Terima kasih telah melakukan pembayaran. Anda akan diarahkan ke halaman pesanan.
          Tolong jangan menutup halaman ini.
        </p>
        <p style={loadingTextStyle}>Arahkan ke halaman pesanan dalam beberapa detik...</p>
      </div>
    </div>
  );
};

export default Success;
