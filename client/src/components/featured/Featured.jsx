import React, { useState, useEffect } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "./img/gambar1.jpg",
    "./img/gambar2.jpg",
    "./img/gambar3.jpg",
    "./img/gambar4.jpg",
    "./img/gambar5.jpg",
    "./img/gambar6.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    if (!input.trim()) {
      setError(true); // Menampilkan pesan kesalahan jika input kosong
      return;
    }
    setError(false); // Hilangkan pesan kesalahan
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div
      className="featured"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="container">
        <div className="left">
          <h1>
            Temukan yang sempurna <span>freelance</span> layanan untuk bisnis Anda
          </h1>
          <form className="search" onSubmit={handleSubmit}>
            <div className="searchInput">
              
              <input
                type="text"
                placeholder='Coba “Jelajahi”'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button type="submit">Cari</button>
          </form>
          {error && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              Silakan masukkan sesuatu untuk dicari.
            </div>
          )}
          <div className="popular"></div>
        </div>
        <div className="right">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
