import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./UserProfile.scss";

const UserProfile = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [newProfilePic, setNewProfilePic] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
    console.log("Berhasil memuat data currentUser dari localStorage:", user);
  }, []);

  // Mengambil data pengguna
  const { isLoading, error, data: userData } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => newRequest.get(`/users/${id}`).then((res) => res.data),
  });

  // Mengambil data gig pengguna
  const { data: gigsData = [] } = useQuery({
    queryKey: ["gigs", id],
    queryFn: () => newRequest.get(`/gigs?userId=${id}`).then((res) => res.data),
  });

  // Menghitung gig unik dan total penjualan
  const uniqueGigs = gigsData
    ? [...new Map(gigsData.map((gig) => [gig._id, gig])).values()]
    : [];
  const totalSales = uniqueGigs.reduce((sum, gig) => sum + (gig.sales || 0), 0);

  
  // Mengambil data percakapan
  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations", id],
    queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
  });

  // Menyaring pesan yang belum dibaca untuk penjual dan pembeli
  const unreadMessagesForSeller = conversations.filter(
    (conversation) => userData?.isSeller && !conversation.readBySeller
  );
  const unreadMessagesForBuyer = conversations.filter(
    (conversation) => !userData?.isSeller && !conversation.readByBuyer
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="userProfile">
      <div className="userProfile__container">
        <h1 className="userProfile__heading">Profil Pengguna</h1>
        <div className="userProfile__header">
          <img
            src={userData.img || "/img/noavatar.jpg"}
            alt="Profile"
            className="userProfile__pic"
          />
        </div>

        <div className="userProfile__details">
          <p><strong>ID Pengguna:</strong> {id}</p>
          <p><strong>Nama Pengguna:</strong> {userData.username}</p>
          <p><strong>Member Sejak:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
          <p><strong>Negara:</strong> {userData.country || "Tidak tersedia"}</p>
          <p><strong>Deskripsi:</strong> {userData.desc || "Tidak ada deskripsi"}</p>

          {userData.isSeller && (
            <>
              <p><strong>Pesan Belum Dibaca:</strong> {unreadMessagesForSeller.length}</p>
              <p><strong>Gig yang Dimiliki:</strong> {gigsData.length}</p>
              <p><strong>Total Penjualan:</strong> {totalSales}</p>

              {/* Menampilkan tombol untuk melihat CV dan Sertifikat hanya untuk penjual */}
              {userData.isSeller && (
                <>
                  {userData.cvImage && (
                    <a href={userData.cvImage} target="_blank" rel="noopener noreferrer">
                      <button className="userProfile__button">Lihat CV</button>
                    </a>
                  )}
                  {userData.certificateImages && userData.certificateImages.length > 0 && (
                    <>
                      {userData.certificateImages.map((certificate, index) => (
                        <a key={index} href={certificate} target="_blank" rel="noopener noreferrer">
                          <button className="userProfile__button">Lihat Sertifikat {index + 1}</button>
                        </a>
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}

          {!userData.isSeller && (
            <p><strong>Pesan Belum Dibaca:</strong> {unreadMessagesForBuyer.length}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
