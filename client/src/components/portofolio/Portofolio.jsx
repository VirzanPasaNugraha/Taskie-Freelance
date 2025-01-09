import React, {useEffect} from "react";
import "./Portofolio.scss";

const Portfolio = () => {
    useEffect(() => {
        // Snowflake effect
        const snowflakeCount = 100;
        const container = document.querySelector('.portfolio-container');
        
        for (let i = 0; i < snowflakeCount; i++) {
          const snowflake = document.createElement('div');
          snowflake.classList.add('snowflake');
          snowflake.style.left = `${Math.random() * 100}%`;
          snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; // Randomize fall duration
          snowflake.style.animationDelay = `${Math.random() * 5}s`; // Randomize delay
          container.appendChild(snowflake);
        }
    
        // Clean up snowflakes on component unmount
        return () => {
          const snowflakes = document.querySelectorAll('.snowflake');
          snowflakes.forEach(snowflake => snowflake.remove());
        };
      }, []);

      
  return (
    <div className="portfolio-container">
      {/* Portofolio pertama */}
      <div className="portfolio">
        <div className="left">
          <h1 className="name">Dede Yayan Suciyana</h1>
          <h2 className="degree">CEO</h2>
          <p className="description">
            Saya adalah seorang mahasiswa yang juga menjabat sebagai CEO di Taskie, sebuah platform inovatif yang menghubungkan individu atau bisnis dengan pekerja lepas (freelancers) untuk menyelesaikan berbagai jenis tugas dan proyek. Sebagai pemimpin, saya bertanggung jawab atas semua keberlangsungan taskie, membangun jaringan kemitraan, dan memastikan Taskie menjadi platform terpercaya untuk kedua belah pihak: pemberi tugas dan freelancer.
          </p>
          <div className="actions">
            <a href="/img/dede.cv.pdf" className="download-btn" download="CV-Dede">Download CV</a>
            <div className="social-media">
              <a href="https://www.instagram.com/nkmfrtbl/profilecard/?igsh=N3hyZjN6Z3Z3bjQy" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/share/15Upwn9Dd3/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="Facebook" />
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <img
            src="/img/dede.jpg"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>

      {/* Portofolio kedua */}
      <div className="portfolio">
        <div className="left">
          <h1 className="name">Virzan Pasa Nugraha</h1>
          <h2 className="degree">Programming</h2>
          <p className="description">
            Saya adalah seorang intelektual muda yang berdedikasi tinggi untuk mencapai tujuan. Saya selalu belajar untuk mencoba hal-hal baru dan memperluas wawasan saya. Saya percaya bahwa kunci kesuksesan adalah konsitensi, disiplin, kerja keras, pantang menyerah, Tanggung jawab dan Ber'doa.
          </p>
          <div className="actions">
            <a href="/img/zan.pdf" className="download-btn" download="CV-Virzan">Download CV</a>
            <div className="social-media">
              <a href="https://www.instagram.com/vpnc_21th/?next=%2F" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100091334442750" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="Facebook" />
              </a>
              <a href="https://github.com/VirzanPasaNugraha" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/2111/2111425.png" alt="Github" />
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <img
            src="/img/janfoto.jpg"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>

      {/* Portofolio ketiga */}
      <div className="portfolio">
        <div className="left">
          <h1 className="name">Siti Rachmania Putri</h1>
          <h2 className="degree">CMO</h2>
          <p className="description">
            Saya seorang mahasiswa Teknologi Informasi tahun ketiga dengan dorongan untuk menciptakan solusi inovatif dan efisien. Saya mencari peluang untuk lebih mengembangkan keterampilan saya dan mendapatkan pengalaman langsung di industri teknologi.
          </p>
          <div className="actions">
            <a href="/img/Siti_cv.pdf" className="download-btn" download="CV-Siti">Download CV</a>
            <div className="social-media">
              <a href="https://www.instagram.com/acinonyx_0/profilecard/?igsh=OWNpaW11ajltZWYz" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="Instagram" />
              </a>
              <a href="https://youtube.com/@sitirachmaniaputri809?si=c_2TtdGa1IV-lEza" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3670/3670209.png" alt="YouTube" />
              </a>
              <a href="https://www.tiktok.com/@hastjaya?_t=8rzNq7cTNyB&_r=1" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3669/3669950.png" alt="TikTok" />
              </a>
              <a href="https://wa.me/+6281214547996" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/15707/15707820.png" alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <img
            src="/img/sitifoto.jpg"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>

      {/* Portofolio keempat */}
      <div className="portfolio">
        <div className="left">
          <h1 className="name">Farida Zahra Arindra</h1>
          <h2 className="degree">CSO</h2>
          <p className="description">
            Saya mahasiswi Teknik Informatika dengan minat di bidang teknologi, desain grafis, dan videografi. Saya cepat belajar hal baru, memiliki keterampilan komunikasi yang baik, dan nyaman bekerja dalam tim maupun secara mandiri.
          </p>
          <div className="actions">
            <a href="/img/CV FARIDA.pdf" className="download-btn" download="CV-Farida">Download CV</a>
            <div className="social-media">
            <a href="https://www.instagram.com/faridazhrra/profilecard/?igsh=ZnF4ZGN4eDlyZ3V6" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="Instagram" />
              </a>
              <a href="https://youtube.com/@faridaarindra4781?si=XdY3_Y7Q5UQtCb-W" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3670/3670209.png" alt="YouTube" />
              </a>
              <a href="https://www.tiktok.com/@farida.zahra.arin?_t=8rzKSOskmQM&_r=1" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3669/3669950.png" alt="TikTok" />
              </a>
              <a href="https://wa.me/6285135003942" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/15707/15707820.png" alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <img
            src="/img/faridafoto.jpg"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>

      {/* Portofolio kelima */}
      <div className="portfolio">
        <div className="left">
          <h1 className="name">Agung Febrian</h1>
          <h2 className="degree">CSO</h2>
          <p className="description">
          Nama saya Agung Febrian. Saya suka membaca dan mendengarkan musik dengan IEM, sebagai cara untuk mengisi waktu luang dan bersantai
          </p>
          <div className="actions">
            <a href="/img/CV_Agung Febrian.pdf" className="download-btn" download="CV-Agung">Download CV</a>
            <div className="social-media">
            <a href="https://www.instagram.com/agngfebrian" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="Instagram" />
              </a>
              <a href="https://youtube.com/@febrianagng?feature=shared" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3670/3670209.png" alt="YouTube" />
              </a>
              <a href="https://www.tiktok.com/@uprisi1ng?_t=8rzPM77aUCu&_r=1" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3669/3669950.png" alt="TikTok" />
              </a>
              <a href="https://www.facebook.com/agngfbrixn?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="Facebook" />
              </a>
              <a href="https://x.com/xxcl1pse" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png" alt="Twitter" />
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <img
            src="/img/agungfoto.jpg"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>

      {/* Portofolio keenam */}
      <div className="portfolio">
        <div className="left">
          <h1 className="name">Kemal Hapidz Prastiawan</h1>
          <h2 className="degree">CFO</h2>
          <p className="description">
          Sebagai CFO di startup penyedia jasa freelancer, saya bertanggung jawab mengelola keuangan perusahaan, menyusun strategi pertumbuhan, dan memastikan keberlanjutan finansial. Fokus saya adalah pada efisiensi, pengelolaan risiko, dan mendukung visi perusahaan melalui keputusan berbasis data.
          </p>
          <div className="actions">
            <a href="/img/mal.pdf" className="download-btn" download="CV-Kemal">Download CV</a>
            <div className="social-media">
            <a href="https://www.instagram.com/sir_malll/profilecard/?igsh=MzFodWQwMWJtMXdy" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="Instagram" />
              </a>
              <a href="https://www.tiktok.com/@malzlenatheaaa?_t=8rzLPc2fZRa&_r=1" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3669/3669950.png" alt="TikTok" />
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <img
            src="/img/kemalfoto.jpg"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>

      {/* Portofolio ketujuh */}
      <div className="portfolio">
        <div className="left">
          <h1 className="name">Sigit Pangestu</h1>
          <h2 className="degree">COO</h2>
          <p className="description">
          Nama: Sigit Pangestu 
          Alamat: Lingk. Talun Kidul Rt. 002 / Rw. 004. Kelurahan Talun. Kecamatan Sumedang Utara. Kabupaten Sumedang. Provinsi Jawa Barat. 453211
          </p>
          <div className="actions">
            <a href="/img/CV.pdf" className="download-btn" download="CV-Sigit">Download CV</a>
            <div className="social-media">
            <a href="https://www.instagram.com/sgtp9/profilecard/?igsh=MWliNWxxZXY3cXhsYg==" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="Instagram" />
              </a>
              <a href="https://www.tiktok.com/@_iigit?_t=8rzSODgTWd6&_r=1" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/3669/3669950.png" alt="TikTok" />
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <img
            src="/img/sigitfoto.jpg"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
