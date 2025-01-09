import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Kategori</h2>
            <a href="/gigs?search=Grafik%20&%20Desain" class="menuLink">
            <span>Grafik & Desain</span>
            </a>
            <a href="/gigs?search=Pemasaran%20Digital" class="menuLink">
            <span>Pemasaran Digital</span>
            </a>
            <a  href="/gigs?search=Penulisan%20&%20Penerjemahan" class="menuLink">
            <span>Penulisan & Penerjemahan</span>
            </a>
            <a href="/gigs?search=Video%20&%20Animasi" class="menuLink">
            <span>Video & Animasi</span>
            </a>
            <a href="/gigs?search=Musik%20&%20Audio" class="menuLink">
            <span>Musik & Audio</span>
            </a>
            <a
            href="/gigs?search=Pemrograman%20&%20Teknologi" class="menuLink">
            <span>Pemrograman & Teknologi</span>
            </a>
            <a
            href="/gigs?search=Data" class="menuLink">
            <span>Data</span>
            </a>
            <a
            href="/gigs?search=Bisnis" class="menuLink">
            <span>Bisnis</span>
            </a>
            <a
            href="/gigs?search=Gaya%20Hidup" class="menuLink">
            <span>Gaya Hidup</span>
            </a>
            <a
            href="/gigs?search=Fotografi" class="menuLink">
            <span>Fotografi</span>
            </a>
          </div>
          <div className="item">
            <h2>Fitur</h2>
            <span>Tim Kami & Project kartu</span>
            <span>Profil</span>
            <span>All Project</span>
            <span>Register</span>
            <span>Register Seller</span>
            <span>Login</span>
            <span>Pembayaran</span>
            <span>Pesan</span>
            <span>Filter</span>
            <span>Responsive & dll.</span>
          </div>
          <div className="item">
            <h2>🏮Taskie</h2>
            <span>Fullstack React & Node.js</span>
          </div>
          <div className="item">
            <h2>Dukungan</h2>
            <span>Jual di Taskie</span>
            <span>Beli di Taskie</span>
          </div>
          <div className="item">
            <h2>Lainnya</h2>
            <span>Mongo DB</span>
            <span>Postman</span>
            <span>Cloudinary</span>
            <span>Stripe</span>
          
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Taskie</h2>
            <span>© Taskie International Ltd. 2024</span>
          </div>
          <div className="right">
            <div className="social">
            <a 
  href="https://x.com/Taskieee?t=tXaoo1-mgNQZunBGhPY4OQ&s=09" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <img src="/img/twitter.png" alt="Twitter Taskie" />
</a>

              <a 
  href="https://www.facebook.com/profile.php?id=61569948234738&mibextid=ZbWKwL" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <img src="/img/facebook.png" alt="Facebook Taskie" />
</a>

              <a 
  href="https://www.instagram.com/taskie.taskie/profilecard/?igsh=cmpjYWwwMnYzNTRy" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <img src="/img/instagram.png" alt="Instagram Taskie" />
</a>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
