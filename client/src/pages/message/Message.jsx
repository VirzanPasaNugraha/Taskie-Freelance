import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

// Fungsi untuk menangani fallback gambar dan menampilkan nama pengguna
const getAvatar = (userId, currentUser, senderImg, senderName) => {
  return userId === currentUser._id
    ? currentUser.img && currentUser.img !== "" // Cek gambar user
      ? currentUser.img
      : "/img/noavatar.jpg" // Gambar fallback jika gambar tidak ada
    : senderImg && senderImg !== "" // Gambar pengirim
    ? senderImg
    : "/img/noavatar.jpg"; // Gambar fallback pengirim
};

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {}; // Tambahkan fallback jika data null
  const [messageStatus, setMessageStatus] = useState("sent"); // Status awal pesan adalah "sent"
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id], // Tambahkan id untuk spesifik query
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return Array.isArray(res.data) ? res.data : []; // Validasi data
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      setMessageStatus("sending"); // Set status menjadi "sending" saat pengiriman dimulai
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
      setMessageStatus("sent"); // Setelah berhasil, status kembali ke "sent"
    },
    onError: () => {
      setMessageStatus("error"); // Jika terjadi error, set status ke "error"
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
      timestamp: new Date().toISOString(),
      userId: currentUser._id,
      status: messageStatus,
    });
    e.target[0].value = ""; // Bersihkan input setelah submit
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {'>'} Taskie {'>'}
        </span>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          <div>{error.message || "Error loading messages."}</div>
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div
                className={`item ${
                  m.userId === currentUser._id ? "owner" : "receiver"
                }`}
                key={m._id || m.timestamp} // Fallback jika _id tidak ada
              >
                <div className="message-avatar">
                  <img
                    src={getAvatar(m.userId, currentUser, m.senderImg)}
                    alt="user-avatar"
                  />
                </div>
                <div className="message-content">
                  <p>{m.desc}</p>
                  <div className="message-meta">
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="Menulis pesan..." required />
          <button
            type="submit"
            disabled={messageStatus === "sending"}
          >
            {messageStatus === "sending" ? "Mengirim..." : "Kirim"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
