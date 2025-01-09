import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";
import io from "socket.io-client";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState([]); // State to hold messages in real-time

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus percakapan ini?")) {
      deleteMutation.mutate(id);
    }
  };

  // Menghubungkan WebSocket dengan server dan mendengarkan event 'new_message'
  useEffect(() => {
    const socket = io("http://localhost:5173"); // Ganti dengan URL server Anda

    socket.on("new_message", (newMessage) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]); // Menambahkan pesan baru ke state
      queryClient.invalidateQueries(["conversations"]); // Memperbarui percakapan dengan pesan baru
    });

    // Membersihkan koneksi socket ketika komponen dibongkar
    return () => {
      socket.off("new_message");
    };
  }, [queryClient]);

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error terjadi, silakan coba lagi."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Pesan</h1>
          </div>
          {data.length === 0 && messages.length === 0 ? (
            <div className="no-messages">
              <p>Tidak ada pesan yang tersedia saat ini.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>{currentUser.isSeller ? "Pembeli" : "Penjual"}</th>
                  <th>Pesan Terakhir</th>
                  <th>Waktu</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((c) => (
                  <tr
                    className={
                      ((currentUser.isSeller && !c.readBySeller) ||
                        (!currentUser.isSeller && !c.readByBuyer)) &&
                      "active"
                    }
                    key={c.id}
                  >
                    <td>
                      {currentUser.isSeller
                        ? `Nama: ${c.buyerUsername}, ID: ${c.buyerId}`
                        : `Nama: ${c.sellerUsername}, ID: ${c.sellerId}`}
                    </td>
                    <td>
                      <Link to={`/message/${c.id}`} className="link">
                        {c?.lastMessage?.substring(0, 100)}...
                      </Link>
                    </td>
                    <td>{moment(c.updatedAt).fromNow()}</td>
                    <td>
                      {((currentUser.isSeller && !c.readBySeller) ||
                        (!currentUser.isSeller && !c.readByBuyer)) && (
                        <button onClick={() => handleRead(c.id)}>
                          Tandai sebagai Dibaca
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="delete-btn"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
