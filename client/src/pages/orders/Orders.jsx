import React from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { getTotalOrders } from "../../utils/orderUtils";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  
  // Fetch orders from the backend
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => res.data), // Fetching orders
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      // Check if there's an existing conversation
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      // If no conversation exists, create a new one
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  // Calculate the total number of orders
  const totalOrders = getTotalOrders(data, currentUser._id);

  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Pesanan</h1>
            <p>Total Pesanan: {totalOrders}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Judul</th>
                <th>Harga</th>
                <th>Kontak</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img className="image" src={order.img} alt="" />
                    </td>
                    <td>{order.title}</td>
                    <td>Rp {new Intl.NumberFormat("id-ID").format(order.price)}</td>
                    <td>
                      <img
                        src="../img/message.png"
                        alt="Message Icon"
                        onClick={() => handleContact(order)} // Handle contact on click
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Tidak ada pesanan yang tersedia</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
