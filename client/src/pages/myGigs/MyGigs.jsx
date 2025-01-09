import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  // Fetch gigs data
  const { data: gigsData, isLoading, error } = useQuery({
    queryKey: ["myGigs", currentUser._id],
    queryFn: () =>
      newRequest
        .get(`/gigs?userId=${currentUser._id}`)
        .then((res) => res.data),
  });

  // Filter out duplicates based on gig._id
  const uniqueGigs = gigsData
    ? [...new Map(gigsData.map((gig) => [gig._id, gig])).values()]
    : [];

  // Calculate total sales from unique gigs
  const totalSales = uniqueGigs
    ? uniqueGigs.reduce((sum, gig) => sum + (gig.sales || 0), 0)
    : 0;

  // Calculate number of owned gigs
  const ownedGigsCount = uniqueGigs ? uniqueGigs.length : 0;

  // Mutation to delete a gig
  const deleteMutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>Gigs Saya</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Tambah Gig baru</button>
            </Link>
          )}
        </div>
        <div className="stats">
          <p>
            <strong>Gigs dimiliki: </strong>
            {ownedGigsCount}
          </p>
          <p>
            <strong>Total Penjualan: </strong>
            {new Intl.NumberFormat("id-ID").format(totalSales)}
          </p>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Cover</th>
              <th>Judul</th>
              <th>Harga</th>
              <th>Penjualan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {uniqueGigs?.map((gig, index) => (
              <tr key={gig._id}>
                <td>{index + 1}</td>
                <td>
                  <img className="image" src={gig.cover} alt={gig.title} />
                </td>
                <td>{gig.title}</td>
                <td>
                  Rp {new Intl.NumberFormat("id-ID").format(gig.price)}
                </td>
                <td>{gig.sales || 0}</td>
                <td>
                  <Link to={`/gig/${gig._id}`}>
                    <button className="view">Lihat</button>
                  </Link>
                  <Link to={`/gigs/${gig._id}`}>
                    <button className="edit">Edit</button>
                  </Link>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt="Delete"
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyGigs;
