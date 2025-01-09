import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer.js";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent double submission
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(""); // State notifikasi
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(""); // State untuk deliveryTime
  const [revisionNumber, setRevisionNumber] = useState("");
  const [error, setError] = useState(""); // State untuk pesan error



  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" && /^\d{0,8}$/.test(value)) {
      setPrice(value);
    }
    if (name === "deliveryTime") {
      // Validasi: hanya angka, tanpa huruf 'e', '-', atau '+'
      if (/^\d*$/.test(value)) {
        setDeliveryTime(value); // Set nilai jika valid
        setError(""); // Hapus pesan error jika valid
      } else {
        setError("Hanya angka yang diperbolehkan."); // Tampilkan error jika tidak valid
      }
    }
      // Validasi untuk revisionNumber
      if (name === "revisionNumber") {
        if (/^\d*$/.test(value)) {
          setRevisionNumber(value); // Set nilai jika valid
          setError(""); // Hapus pesan error jika valid
        } else {
          setError("Hanya angka yang diperbolehkan untuk revisionNumber."); // Tampilkan error jika tidak valid
        }
      }
    

    if (name === "category") {
      const categoryTitles = {
        design: "Grafik & Desain",
        "video&animation": "Video & Animasi",
        "writing&translation": "Penulisan & Penerjemahan",
        "music&audio": "Musik & Audio",
        business: "Bisnis",
        programming: "Pemrograman & Teknologi",
        lifestyle: "Gaya Hidup",
        data: "Data",
        photography: "Fotografi",
      };

      dispatch({
        type: "CHANGE_INPUT",
        payload: { name: "title", value: categoryTitles[value] || "" },
      });
      dispatch({
        type: "CHANGE_INPUT",
        payload: { name, value },
      });
    } else {
      dispatch({
        type: "CHANGE_INPUT",
        payload: { name, value },
      });
    }
  };

  const handleFeature = (e) => {
    e.preventDefault();
    const featureValue = e.target[0].value.trim();
    if (featureValue) {
      dispatch({
        type: "ADD_FEATURE",
        payload: featureValue,
      });
      e.target[0].value = "";
  
      // Set notification when feature is added successfully
      setNotification("Fitur berhasil ditambahkan!");
    }
  };
  

  const handleUpload = async () => {
    if (singleFile && singleFile.size > 15000000) {  // 15MB
      setNotification("Ukuran file terlalu besar, maksimal 15MB.");
      return;
    }
    for (const file of files) {
      if (file.size > 15000000) {
        setNotification("Ukuran file gambar terlalu besar, maksimal 15MB.");
        return;
      }
    }
  
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => await upload(file))
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
  
      // Set notification when images are uploaded successfully
      setNotification("Gambar berhasil diupload!");
    } catch (err) {
      console.error(err);
      setUploading(false);
      setNotification("Terjadi kesalahan dalam meng-upload gambar.");
    }
  };

  const mutation = useMutation({
    mutationFn: (gig) => newRequest.post("/gigs", gig),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
    onError: (error) => {
      console.error("Error saving gig:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
  const newErrors = {};

    if (isSubmitting) return; // Mencegah pengiriman ulang

  

    // Validasi form sebelum dikirim
    if (!state.category || !price || !state.desc || state.features.length === 0) {
      setNotification("Semua field harus diisi dengan benar.");
      return;
    }
  
    setNotification("Gig sedang dibuat...");
    setIsSubmitting(true);  // Set isSubmitting true ketika mulai submit
  
    mutation.mutate(state, {
      onSuccess: () => {
        setNotification("Gig berhasil dibuat!");
        setIsSubmitting(false);  // Set isSubmitting false setelah sukses
        setTimeout(() => navigate("/myGigs"), 2000);
      },
      onError: (err) => {
        console.error(err);
        setNotification("Terjadi kesalahan, coba lagi.");
        setIsSubmitting(false);  // Set isSubmitting false jika ada error
      },
    });
  };
  
  return (
    <div className="add">
      <div className="container">
        <h1>Buat Project</h1>
  
        {notification && <div className="notification">{notification}</div>}
  
        <div className="sections">
          <div className="info">
            <label htmlFor="title">Judul</label>
            <input
              type="text"
              name="title"
              placeholder="terisi otomatis"
              value={state.title || ""}
              readOnly // Membuat input tidak dapat diedit
            />
            <label htmlFor="category">Kategori</label>
            <select
              name="category"
              onChange={handleChange}
              value={state.category || ""}
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              <option value="design">Grafik & Desain</option>
              <option value="video&animation">Video & Animasi</option>
              <option value="writing&translation">Penulisan & Penerjemahan</option>
              <option value="music&audio">Musik & Audio</option>
              <option value="business">Bisnis</option>
              <option value="programming">Pemrograman & Teknologi</option>
              <option value="lifestyle">Gaya Hidup</option>
              <option value="data">Data</option>
              <option value="photography">Fotografi</option>
            </select>
  
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Gambar</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png" // Membatasi format file
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
                      alert('Format gambar yang diterima hanya JPEG, JPG, atau PNG');
                      e.target.value = ''; // Reset input file
                    } else {
                      setSingleFile(file);
                    }
                  }}
                />
                <label htmlFor="">Upload Gambar</label>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png" // Membatasi format file
                  onChange={(e) => {
                    const files = e.target.files;
                    const validFiles = [];
                    const invalidFiles = [];
  
                    for (let i = 0; i < files.length; i++) {
                      if (['image/jpeg', 'image/png'].includes(files[i].type)) {
                        validFiles.push(files[i]);
                      } else {
                        invalidFiles.push(files[i]);
                      }
                    }
  
                    if (invalidFiles.length > 0) {
                      alert('Format gambar yang diterima hanya JPEG, JPG, atau PNG');
                    }
  
                    setFiles(validFiles);
                  }}
                />
              </div>
              <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
  
            <label htmlFor="">Deskripsi</label>
            <textarea
              name="desc"
              placeholder=""
              onChange={handleChange}
            ></textarea>
            <button
              onClick={handleSubmit}
              disabled={loading} // Disable saat sedang submit
            >
              {loading ? "Submitting..." : "Buat"}  {/* Tampilkan status jika sedang submit */}
            </button>
          </div>

  
          <div className="details">
            <label htmlFor="">Layanan</label>
            <input
              type="text"
              name="shortTitle"
              placeholder=""
              onChange={handleChange}
            />
            <label htmlFor="">Deskripsi Layanan Singkat</label>
            <textarea
              name="shortDesc"
              placeholder=""
              onChange={handleChange}
            ></textarea>
              <label htmlFor="">Estimasi</label>
              <input
                type="number"
                value={deliveryTime}
                name="deliveryTime"
                placeholder=""
                onChange={handleChange}
              />
            <label htmlFor="">Revisi</label>
            <input
              type="number"
              value={revisionNumber}
              name="revisionNumber"
              placeholder=""
              onChange={handleChange}
            />
            <div className="price-and-feature">
              <div className="currency-input">
                <span className="currency-symbol">Rp</span>
                <input
                  type="text"
                  name="price"
                  value={price}
                  placeholder="Harga layanan"
                  onChange={handleChange}
                  maxLength="8"
                  minLength="4"
                  required
                />
              </div>
              <form onSubmit={handleFeature}>
                <input type="text" placeholder="Tambahkan fitur baru" />
                <button type="submit">Tambah</button>
              </form>
              <div className="addedFeatures">
                {state?.features?.map((f) => (
                  <div className="item" key={f}>
                    <button
                       onClick={() =>
                        dispatch({ type: "REMOVE_FEATURE", payload: f })
                      }
                    >
                      {f}
                      <span>X</span>
                    </button>
                  </div>
                ))}
              </div>
                {/* Tampilkan pesan error jika ada */}
      {error && <span style={{ color: "red" }}>{error}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  
export default Add;
