import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams, useNavigate } from "react-router-dom"; 
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import getCurrentUser from "../../utils/getCurrentUser";
import { format, parse } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

function Gig() {
  const { id } = useParams();
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  // Fungsi untuk menampilkan profil penjual berdasarkan userId gig
const handleViewProfile = (sellerId) => {
  console.log(sellerId); // Debug untuk memeriksa sellerId yang diteruskan
  if (currentUser?._id !== sellerId) {  // Pastikan kita tidak mengarahkan ke profil sendiri
    navigate(`/userProfile/${sellerId}`);
  }
};

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const rawDate = dataUser?.memberSince;

  let formattedDate = "Invalid Date";
  if (rawDate) {
    const parsedDate = parse(rawDate, "d MMMM yyyy, HH:mm:ss", new Date(), { locale: idLocale });
    formattedDate = !isNaN(parsedDate.getTime())
      ? format(parsedDate, "d MMMM yyyy", { locale: idLocale })
      : "Invalid Date";
  }

  if (isLoading || isLoadingUser) return <div>Loading...</div>;
  if (error || errorUser) return <div>Something went wrong!</div>;

  const isOwner = currentUser?._id === data?.userId;

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">Taskie</span>
          <h1>{data.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={dataUser.img || "/img/noavatar.jpg"}
              alt="Profile"
            />
            <span>{dataUser.username}</span>
            {!isNaN(data.totalStars / data.starNumber) && (
              <div className="stars">
                {Array(Math.round(data.totalStars / data.starNumber))
                  .fill()
                  .map((_, i) => (
                    <img src="/img/star.png" alt="Star" key={i} />
                  ))}
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
              </div>
            )}
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            {data.images.map((img) => (
              <img key={img} src={img} alt="Gig Preview" />
            ))}
          </Slider>
          <h2>Tentang Gig ini</h2>
          <p>{data.desc}</p>
          <div className="seller">
            <h2>Tentang Penjual</h2>
            <div className="user">
              <img src={dataUser?.img || "/img/noavatar.jpg"} alt="Profile" />
              <div className="info">
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((_, i) => (
                        <img src="/img/star.png" alt="Star" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
                <button onClick={() => {
  console.log("User ID yang dikirim:", data.userId);  // Debug log
  handleViewProfile(data.userId);
}}>
  Lihat
</button>

              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">Dari :</span>
                  <span className="desc"> &nbsp;{dataUser.country}</span>
                </div>
              </div>
              <div className="item">
                <span className="title1">Anggota Sejak :</span>
                <span className="desc">&nbsp;{formattedDate}</span>
              </div>
              <p>{dataUser.desc}</p>
              <hr />
              <div className="cv-certificate-buttons">
  {/* Conditionally render CV and Certificate Image buttons */}
  {dataUser.cvImage && (
    <a href={dataUser.cvImage} target="_blank" rel="noopener noreferrer">
      <button>View CV</button>
    </a>
  )}
  {dataUser.certificateImages && dataUser.certificateImages.length > 0 && (
    <>
      {dataUser.certificateImages.map((certificate, index) => (
        <a key={index} href={certificate} target="_blank" rel="noopener noreferrer">
          <button>View Certificate {index + 1}</button>
        </a>
      ))}
    </>
  )}
</div>


            </div>
          </div>
          <Reviews gigId={id} />
        </div>
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>{formatRupiah(data.price)}</h2>
          </div>
          <p>{data.shortDesc}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="Delivery Time" />
              <span>{data.deliveryTime} Pengiriman Hari</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="Revisions" />
              <span>{data.revisionNumber} Revisi</span>
            </div>
          </div>
          <div className="features">
            {data.features.map((feature) => (
              <div className="item" key={feature}>
                <img src="/img/greencheck.png" alt="Feature" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          {currentUser?._id !== data?.userId ? (
  <Link to={`/pay/${id}`}>
    <button>Beli</button>
  </Link>
) : (
  <Link to={`/gigs/${id}/edit`}>
    <button>Edit</button>
  </Link>
)}
        </div>
      </div>
    </div>
  );
}

export default Gig;
