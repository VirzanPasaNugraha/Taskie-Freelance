import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Track mobile menu state

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // Safe JSON.parse with error handling
  let currentUser = null;
  try {
    const storedUser = localStorage.getItem("currentUser");
    currentUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error saat parsing currentUser dari localStorage:", error);
  }


  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen); // Toggle mobile menu
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Taskie</span>
          </Link>
          <span className="dot">.</span>
        </div>

        {/* Links for larger screens */}
        <div className="links">
          <div
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            style={{ color: '#0066ff', fontSize: '20px', cursor: 'default', fontWeight: 'bold'}}
          >
            ⚙
          </div>
          <a href="/gigs?cat=design">
            <span>Jelajahi Project</span>
          </a>
          <Link to="/portofolio">Tim Kami</Link>
          {!currentUser?.isSeller && <span></span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="user-avatar" className="user-avatar" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/myGigs">
                        Proyek Saya
                      </Link>
                      <Link className="link" to="/add">
                        Buat Proyek
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Pesanan
                  </Link>
                  <Link className="link" to="/messages">
                    Pesan
                  </Link>
                  <Link className="link" to={`/userProfile/${currentUser._id}`}>
                    Profile
                  </Link>

                  <Link className="link" onClick={handleLogout}>
                    Keluar
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Masuk
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
                
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Desktop Menu */}
      {(active || pathname !== "/") && !mobileMenuOpen && (
        <div className="menu">
          <a
            className="link menuLink"
            href="/gigs?search=Grafik%20%26%20Desain"
            onClick={() =>
              handleRefresh("/gigs?search=Grafik%20&%20Desain")
            }
          >
            Grafik & Desain
          </a>
          <a
            className="link menuLink"
            href="/gigs?search=Pemasaran%20Digital"
            onClick={() =>
              handleRefresh("/gigs?search=Pemasaran%20Digital")
            }
          >
            Pemasaran Digital
          </a>
          <a
            className="link menuLink"
            href="/gigs?search=Video%20&%20Animasi"
            onClick={() =>
              handleRefresh("/gigs?search=Video%20&%20Animasi")
            }
          >
            Video & Animasi
          </a>
          <a
            className="link menuLink"
            href="/gigs?search=Penulisan%20&%20Penerjemahan"
            onClick={() =>
              handleRefresh("/gigs?search=Penulisan%20&%20Penerjemahan")
            }
          >
            Penulisan & Penerjemahan
          </a>
          <a
            className="link menuLink"
            href="gigs?search=Fotografi"
            onClick={() => handleRefresh("/gigs?search=Fotografi")}
          >
            Fotografi
          </a>
          <a
            className="link menuLink"
            href="/gigs?search=Data"
            onClick={() => handleRefresh("/gigs?search=Data")}
          >
            Data
          </a>
          <a
            className="link menuLink"
            href="/gigs?search=Musik%20&%20Audio"
            onClick={() =>
              handleRefresh("/gigs?search=Musik%20&%20Audio")
            }
          >
            Musik & Audio
          </a>
          <a
            className="link menuLink"
            href="/gigs?search=Pemrograman%20&%20Teknologi"
            onClick={() =>
              handleRefresh("/gigs?search=Pemrograman%20&%20Teknologi")
            }
          >
            Pemrograman & Teknologi
          </a>
          <a
            className="link menuLink"
            href="/gigs?search=Bisnis"
            onClick={() => handleRefresh("/gigs?search=Bisnis")}
          >
            Bisnis
          </a>
          <a
            className="link menuLink"
            href="/gigs?search=Gaya%20Hidup"
            onClick={() => handleRefresh("/gigs?search=Gaya%20Hidup")}
          >
            Gaya Hidup
          </a>
        </div>
      )}
    </div>
  );
}

export default Navbar;
