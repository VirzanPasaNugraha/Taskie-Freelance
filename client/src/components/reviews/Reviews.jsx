import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

const Reviews = ({ gigId, userId }) => {
  const queryClient = useQueryClient();

  // Fetch reviews for the gig
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  // Mutation for adding a new review
  const mutationAdd = useMutation({
    mutationFn: (review) => newRequest.post("/reviews", review),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]);
    },
  });

  // Mutation for deleting a review
  const mutationDelete = useMutation({
    mutationFn: (reviewId) => newRequest.delete(`/reviews/${reviewId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]);
    },
  });

  // Handle form submission to add a review
  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutationAdd.mutate({ gigId, userId, desc, star });
    e.target.reset(); // Reset form after submission
  };

  // Handle delete review
  const handleDelete = (reviewId) => {
    mutationDelete.mutate(reviewId);
  };

  return (
    <div className="reviews">
      <h2></h2>
      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data.map((review) => (
            <Review
              key={review._id}
              review={review}
              onDelete={() => handleDelete(review._id)}
              userId={userId}
            />
          ))}
      <div className="add">
    
        <form className="addForm" onSubmit={handleSubmit}>
          <div className="addFormRow">
            <input type="text" placeholder="Tulis komentar" required />
            <select required>
              <option value="" disabled selected>
                Nilai
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button type="submit">Kirim</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
