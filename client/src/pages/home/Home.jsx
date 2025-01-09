import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";

function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
        <div className="explore">
          <div className="container">
            <div className="items">
              <div className="item">
              <a href="/gigs?search=Grafik%20&%20Desain">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                  alt="Grafik & Desain"
                /></a>
                <a href="/gigs?search=Grafik%20&%20Desain">
                <div className="line"></div></a>
                <a href="/gigs?search=Grafik%20&%20Desain">
                <span>Grafik & Desain</span></a>
              </div>
              <div className="item">
                
              <a href="/gigs?search=Pemasaran%20Digital">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                  alt="Pemasaran Digital"
                /></a>
                <a href="/gigs?search=Pemasaran%20Digital">
                <div className="line"></div></a>
                <a href="/gigs?search=Pemasaran%20Digital">
                <span>Pemasaran Digital</span></a>
              </div>
              <div className="item">
              <a href="/gigs?search=Penulisan%20&%20Penerjemahan">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                  alt="Penulisan & Penerjemahan"
                /></a>
                <a href="/gigs?search=Penulisan%20&%20Penerjemahan">
                <div className="line"></div></a>
                <a href="/gigs?search=Penulisan%20&%20Penerjemahan">
                <span>Penulisan & Penerjemahan</span></a>
              </div>
              <div className="item">
              <a href="/gigs?search=Video%20&%20Animasi">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                  alt="Video & Animasi"
                /></a>
                <a href="/gigs?search=Video%20&%20Animasi">
                <div className="line"></div></a>
                <a href="/gigs?search=Video%20&%20Animasi">
                <span>Video & Animasi</span></a>
              </div>
              <div className="item">
              <a href="/gigs?search=Musik%20&%20Audio">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                  alt="Musik & Audio"
                /></a>
                <a href="/gigs?search=Musik%20&%20Audio">
                <div className="line"></div></a>
                <a href="/gigs?search=Musik%20&%20Audio">
                <span>Musik & Audio</span></a>
              </div>
              <div className="item">
              <a href="/gigs?search=Pemrograman%20&%20Teknologi">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                  alt="Pemrograman & Teknologi"
                />
                </a>
                <a href="/gigs?search=Pemrograman%20&%20Teknologi">
                <div className="line"></div></a>
                <a href="/gigs?search=Pemrograman%20&%20Teknologi">
                <span>Pemrograman & Teknologi</span></a>
              </div>
              <div className="item">
              <a href="/gigs?search=Bisnis">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                  alt="Bisnis"
                />
                </a>
                <a href="/gigs?search=Bisnis">
                <div className="line"></div></a>
                <a href="/gigs?search=Bisnis">
                <span>Bisnis</span></a>
              </div>
              <div className="item">
              <a href="/gigs?search=Gaya%20Hidup">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                  alt="Gaya Hidup"
                />
                </a>
                <a href="/gigs?search=Gaya%20Hidup">
                <div className="line"></div></a>
                <a href="/gigs?search=Gaya%20Hidup">
                <span>Gaya Hidup</span></a>
              </div>
              <div className="item">
              <a href="/gigs?search=Data">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                  alt="Data"
                /></a>
                <a href="/gigs?search=Data">
                <div className="line"></div>
                </a>
                <a href="/gigs?search=Data">
                <span>Data</span></a>
              </div>
              <div className="item">
                <a href="/gigs?search=Fotografi">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                  alt="Fotografi"
                />
                </a>
                <a href="/gigs?search=Fotografi">
              <div className="line"></div>
              </a>
                <a href="/gigs?search=Fotografi">
                <span>Fotografi</span></a>
              </div>
            </div>
          </div>
        </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
            <i>🌐</i>
            </h1>
            <h1>
             Taskie <i>Project</i>
            </h1>
            <p>
            Temukan freelancer berbakat yang siap membantu Anda mewujudkan proyek impian. Dari desain grafis, pengembangan web, penulisan, hingga pemasaran digital, temukan ahli di berbagai bidang dengan mudah.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Temukan Keahlian yang Anda Butuhkan Di [ Taskie ], Anda bisa dengan mudah menemukan pekerja lepas yang siap membantu mewujudkan proyek Anda. Dari desain, pengembangan, penulisan, hingga berbagai keahlian teknis lainnya, semua ada di sini.
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Bergabung Sebagai Pekerja Lepas Tawarkan keahlian Anda ke dunia! Daftar sebagai pekerja lepas dan temukan proyek yang sesuai dengan passion dan keterampilan Anda. Dapatkan pekerjaan fleksibel dengan penghasilan yang memadai.
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Proyek Fleksibel, Hasil Berkualitas Pilih proyek sesuai keinginan dan kemampuan Anda. Setiap pekerjaan dijamin akan dikerjakan oleh pekerja lepas yang terampil, untuk memastikan hasil yang maksimal.
            </div>
            <a href="/gigs?cat=design">
  <button>Jelajahi Project</button>
</a>
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
