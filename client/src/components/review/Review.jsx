import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import "./Review.scss";

const Review = ({ review }) => {
  const queryClient = useQueryClient();
  
  // Ambil data pengguna berdasarkan userId
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  // Mutation untuk menghapus review
  const deleteMutation = useMutation({
    mutationFn: () => newRequest.delete(`/reviews/${review._id}`),
    onSuccess: () => {
      // Menginvalidasi query 'reviews' agar data terbaru di-fetch kembali setelah penghapusan
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  // Handler untuk menghapus review
  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="review">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching user data</p>
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/img/noavatar.jpg"} alt={data.username} />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}

      <div className="stars">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <img src="/img/star.png" alt="star" key={i} />
          ))}
        <span>{review.star}</span>
      </div>

      <p>{review.desc}</p>

      <div className="helpful">
        <span>Membantu?</span>
        <img className="icon" src="/img/like.png" alt="like" />
        <span>Yes</span>
        <img className="icon" src="/img/dislike.png" alt="dislike" />
        <span>No</span>
      </div>

      {/* Tombol untuk menghapus review */}
      <button className="deleteButton" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Review;
