import React, { useState } from "react";
import upload from "../../utils/upload";
import "./RegisterSeller.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link untuk navigasi ke halaman login
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [loading, setLoading] = useState(false);
  const [cvImage, setCvImage] = useState(null);
  const [certificateImages, setCertificateImages] = useState([]);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",               // Gambar Profil
    cvImage: null,                // Gambar CV
    certificateImages: [], // Gambar Sertifikat (bisa lebih dari satu file)
    country: "",
    phone: "",
    isSeller: true,
    desc: "",
  });

  const navigate = useNavigate();

  const countryCodes = {
    "Indonesia": "+62",
    "Malaysia": "+60",
    "Singapura": "+65",
    "Amerika Serikat": "+1",
    "Jepang": "+81",
    "India": "+91",
    "Inggris": "+44",
    "Australia": "+61",
  };

  const validCountries = Object.keys(countryCodes);


  //Upload Cv dan Sertfikat
  const handleFileUpload = async (file, isCv) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "taskie");  // ganti dengan preset yang sesuai
  
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dp9cdmt9s/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (isCv) {
        setCvImage(data.secure_url);  // URL file CV
      } else {
        setCertificateImages((prevImages) => [
          ...prevImages,
          data.secure_url,  // URL file Sertifikat
        ]);
      }
    } catch (err) {
      console.error("Error uploading file to Cloudinary:", err);
    }
  };
  
  // Validasi berdasarkan nama field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (value.trim().length < 3) {
          error = "Username harus minimal 3 karakter.";
        }
       else if (value.length > 20) {
        error = "Username tidak boleh lebih dari 20 karakter.";      
      } else if (/[^a-zA-Z0-9]/.test(value)) {
          error = "Username hanya boleh mengandung huruf dan angka!";
        } else if (/\s/.test(value)) {
          error = "Username tidak boleh mengandung spasi!";
        }
        break;
        case "email":
          if (!value) {
            error = "Email wajib diisi!";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Email tidak valid. Pastikan ada '@' dan domain.";
          } else if (/\s/.test(value)) {
            error = "Email tidak boleh mengandung spasi!";
          } else if (value.length > 25) {
            error = "Email tidak boleh lebih dari 25 karakter.";
          } else if (!/^[^\s@]+@[^\s@]+\.(com|co\.id)$/.test(value)) {
            error = "Email harus memiliki domain .com atau .co.id!";
          }
          break;
        
      case "password":
        if (!value) {
          error = "Password wajib diisi!";
        } else if (value.length < 5) {
          error = "Password harus minimal 5 karakter.";
        } else if (/\s/.test(value)) {
          error = "Password tidak boleh mengandung spasi!";
        }
       else if (value.length > 12) {
        error = "Password tidak boleh lebih dari 12 karakter.";      
      }
        break;
      case "country":
        if (!validCountries.includes(value)) {
          error = "Pilih negara yang valid dari daftar.";
        }
        break;
      case "phone":
        if (!/^\d{10,15}$/.test(value)) {
          error = "Nomor telepon harus berupa angka 10-15 digit.";
        }
        break;
      case "desc":
        if (value.trim() === "") {
          error = "Deskripsi tidak boleh kosong.";
        }
        break;
      case "img":
        if (!file) {
          error = "Harap unggah gambar profil!";
        }
        break;
        case "cvImage":
          if (!file) {
            error = "Harap unggah CV Anda!";
          }
          break;
case "certificateImages":
  if (!file || file.length === 0) {
    error = "Harap unggah setidaknya 1 sertifikat!";
  } else if (file.length > 3) {
    error = "Max 3. Kalau lebih Sertifikat anda tidak ada!";
  }
  break;

      default:
        break;
    }

    return error;
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file, true);  // true untuk CV
  };

  const handleCertificateChange = (e) => {
    const files = Array.from(e.target.files);
  
    // Validasi jumlah file (maksimal 3)
    if (files.length > 3) {
      alert("Max 3. Kalau lebih Sertifikat anda tidak ada!");
      return;
    }
  
    // Validasi jumlah file (minimal 1)
    if (files.length === 0) {
      alert("Anda harus mengunggah setidaknya 1 sertifikat!");
      return;
    }
  

    // Proses upload file
    files.forEach((file) => {
      handleFileUpload(file, false); // `false` untuk Sertifikat
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validasi input secara langsung saat pengguna mengetik
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    // Set state user
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: true,
    }));
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    const phoneCode = countryCodes[country];

    setUser((prev) => ({
      ...prev,
      country: country,
      phone: phoneCode ? `${phoneCode} ` : prev.phone, // Menambahkan kode negara otomatis
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Cegah multiple klik
    if (loading) return;
    setLoading(true); // Set loading to true saat form sedang disubmit
  
    // Validasi semua field sebelum submit
    const newErrors = {};
    Object.keys(user).forEach((key) => {
      const error = validateField(key, user[key]); // Ganti dengan fungsi validasi sesuai kebutuhan
      if (error) {
        newErrors[key] = error;
      }
    });
  
    // Validasi jumlah sertifikat maksimal 3
    if (certificateImages.length > 3) {
      newErrors.certificateImages = "Jumlah sertifikat maksimal adalah 3.";
      // Hapus file yang kelebihan
      certificateImages.splice(3); // Mempertahankan hanya 3 file pertama
    }
  
    if (Object.keys(newErrors).length > 0) {
      // Tampilkan error jika ada
      setErrors(newErrors);
      setLoading(false);
      return;
    }
  
    try {
      // Upload gambar profil jika ada
      const imgUrl = file ? await upload(file) : user.img; // Jika ada gambar profil baru, upload
  
      // Upload gambar CV jika ada
      const cvImageUrl = cvImage ? await upload(cvImage) : user.cvImage; // Jika ada gambar CV baru, upload
  
      // Upload sertifikat (maksimal 3 file)
      const certificateImageUrls = await Promise.all(
        certificateImages.map(async (certificate) => {
          return await upload(certificate); // Upload setiap gambar sertifikat
        })
      );
  
      // Menyiapkan data untuk dikirim
      const formData = {
        username: user.username,
        email: user.email,
        password: user.password,
        img: imgUrl,               // Gambar profil
        cvImage: cvImageUrl,       // Gambar CV
        certificateImages: certificateImageUrls,  // Sertifikat
        country: user.country,
        phone: user.phone,
        isSeller: true,            // Penjual di-set menjadi true
        desc: user.desc,
      };
  
      // Kirim data ke server untuk registrasi
      const res = await newRequest.post("/auth/register", formData);
  
      // Tampilkan pesan sukses jika berhasil
      toast.success("Registrasi Berhasil!", { position: "top-center" });
      navigate("/login"); // Arahkan ke halaman login setelah berhasil
      window.location.reload(); // Lakukan refresh halaman
    } catch (err) {
      // Tangani error jika terjadi kesalahan saat pengiriman data
      setErrors(err.response?.data || { general: "Terjadi kesalahan!" });
      toast.error("Registrasi Gagal!", { position: "top-center" });
    }
  
    setLoading(false); // Set loading ke false setelah proses selesai
  };
  

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">


          <h1>Taskie<span className="subtext">Penjual.</span></h1>
          {/* Username */}
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Masukkan username"
            value={user.username}
            onChange={handleChange}
            onKeyDown={(e) => {
              const value = e.target.value + e.key; // Simulate the input value after typing
              if (e.key === " " || e.keyCode === 32) {
                e.preventDefault(); // Prevent space from being entered
                setErrors((prev) => ({
                  ...prev,
                  username: "Username tidak boleh mengandung spasi!",
                }));
              } else if (value.length >= 12 && e.key !== "Backspace") {
                e.preventDefault(); // Mencegah lebih dari 12 karakter
                setErrors((prev) => ({
                  ...prev,
                  username: "Username tidak boleh lebih dari 12 karakter!",
                }));
              } else if (/[^a-zA-Z0-9]/.test(value)) {
                e.preventDefault(); // Prevent invalid characters from being entered
                setErrors((prev) => ({
                  ...prev,
                  username: "Username hanya boleh mengandung huruf dan angka!",
                }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  username: "",
                }));
              }
            }}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
{/* Email */}
<label htmlFor="email">Email</label>
<input
  name="email"
  type="email"
  placeholder="Masukkan email"
  value={user.email}
  onChange={handleChange}
  maxLength={25} // Membatasi panjang maksimum karakter
  onKeyDown={(e) => {
    const specialCharsRegex = /[<>\"'`],()""{}=+-_``~~?:;!/; // Regex untuk mendeteksi karakter khusus
    
    if (e.key === " " || e.keyCode === 32) {
      e.preventDefault(); // Mencegah spasi
      setErrors((prev) => ({
        ...prev,
        email: "Email tidak boleh mengandung spasi!",
      }));
    } else if (specialCharsRegex.test(e.key)) {
      e.preventDefault(); // Mencegah karakter khusus
      setErrors((prev) => ({
        ...prev,
        email: "Email tidak boleh mengandung karakter khusus!",
      }));
    } else if (user.email.length >= 25 && e.key !== "Backspace") {
      e.preventDefault(); // Mencegah input tambahan
      setErrors((prev) => ({
        ...prev,
        email: "Email tidak boleh lebih dari 25 karakter!",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  }}
  onBlur={() => {
    const domainRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.id)$/; // Regex untuk memastikan domain .com atau .co.id
    if (!domainRegex.test(user.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Email harus memiliki domain .com atau .co.id!",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  }}
  required
/>
{errors.email && <span className="error">{errors.email}</span>}


    {/* Password */}
<label htmlFor="password">Password</label>
<input
  name="password"
  type="password"
  placeholder="Masukkan password"
  value={user.password}
  onChange={handleChange}
  maxLength={12} // Membatasi panjang maksimum karakter
  onKeyDown={(e) => {
    // Hanya lanjutkan validasi jika bukan tombol Backspace atau Delete
    if (e.key !== "Backspace" && e.key !== "Delete") {
      const value = e.target.value + e.key; // Simulasi nilai input setelah mengetik
      if (e.key === " " || e.keyCode === 32) {
        e.preventDefault(); // Mencegah spasi
        setErrors((prev) => ({
          ...prev,
          password: "Password tidak boleh mengandung spasi!",
        }));
      } else if (/[^a-zA-Z0-9]/.test(value)) {
        e.preventDefault(); // Mencegah karakter tidak valid
        setErrors((prev) => ({
          ...prev,
          password: "Password hanya boleh mengandung huruf dan angka!",
        }));
      } else if (value.length > 12) {
        e.preventDefault(); // Mencegah input tambahan setelah 12 karakter
        setErrors((prev) => ({
          ...prev,
          password: "Password tidak boleh lebih dari 12 karakter!",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }
  }}
  required
/>
{errors.password && <span className="error">{errors.password}</span>}


          {/* Gambar Profil */}
<label htmlFor="img">Gambar Profil</label>
<input
  type="file"
  onChange={(e) => setFile(e.target.files[0])}
  required
  accept=".jpg, .jpeg, .png"  // Restricting file formats to JPEG, JPG, and PNG
/>
{errors.img && <span className="error">{errors.img}</span>}

         {/* Gambar CV */}
<label htmlFor="cvImage">Gambar CV</label>
<input
  type="file"
  id="cvImage"
  name="cvImage"
  onChange={handleCvChange}
  required
  accept=".jpg, .jpeg, .png"  // Restricting file formats to JPEG, JPG, and PNG
/>
{errors.cvImage && <span className="error">{errors.cvImage}</span>}


        </div>

        <div className="right">
                    {/* Gambar Sertfikat */}
{/* Gambar Sertifikat */}
<label htmlFor="certificateImages">Gambar Sertifikat</label>
<input
  type="file"
  id="certificateImages"
  name="certificateImages"
  onChange={handleCertificateChange}
  required
  accept=".jpg, .jpeg, .png"  // Membatasi format file hanya JPG, JPEG, dan PNG
  multiple // Izinkan multiple file upload
/>
{errors.certificateImages && <span className="error">{errors.certificateImages}</span>}

{/* Tampilkan nama file yang diunggah */}
<div>
  {certificateImages.length > 0 && (
    <ul>
      {Array.from(certificateImages).map((file, index) => (
        <li key={index}>{file.name}</li>
      ))}
    </ul>
  )}
</div>


          

          {/* Negara */}
          <label htmlFor="country">Negara</label>
          <select
            name="country"
            value={user.country}
            onChange={handleCountryChange}
            required
          >
            <option value="">Pilih negara</option>
            {validCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <span className="error">{errors.country}</span>}

{/* Nomor Telepon */}
<label htmlFor="phone">Nomor Telepon</label>
<input
  name="phone"  
  type="tel"
  id="phone"
  placeholder="Masukkan nomor telepon"
  value={user.phone}
  onChange={(e) => {
    // Remove non-numeric characters
    let value = e.target.value.replace(/\D/g, '');
    
    // Update state value
    handleChange(e);
    
    // Set error message for invalid length
    if (value.length < 9 || value.length > 13) {
      setErrors((prev) => ({
        ...prev,
        phone: "Nomor telepon harus terdiri dari 9 hingga 13 digit!",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }
  }}
  onInput={(e) => {
    // Remove non-numeric characters
    let value = e.target.value.replace(/\D/g, '');
    // Limit the length to 13 characters
    if (value.length > 13) {
      value = value.slice(0, 13);
    }
    e.target.value = value;
  }}
  required
/>
{errors.phone && <span className="error">{errors.phone}</span>}


{/* Deskripsi */}
<label htmlFor="desc">Deskripsi</label>
<textarea
  name="desc"
  placeholder="Deskripsi singkat tentang Anda"
  id=""
  cols="30"
  rows="5"
  value={user.desc}
  onChange={(e) => {
    const value = e.target.value;

    // Update state jika panjang karakter <= 200
    if (value.length <= 200) {
      handleChange(e); // Tetap perbarui state jika valid
    }

    // Validasi error untuk deskripsi
    if (value.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        desc: "",
      }));
    } else if (value.length > 200) {
      setErrors((prev) => ({
        ...prev,
        desc: "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        desc: "",
      }));
    }
  }}
  required
/>
{errors.desc && <span className="error">{errors.desc}</span>}

<button type="submit" onClick={handleSubmit} disabled={loading}>
  {loading ? "Mendaftar..." : "Daftar"}
</button>

          
        

                    {/* Link ke halaman login di atas tombol Daftar */}
                    <div className="login-link">
                    <div className="centered-text">
  <p>
    Sudah punya akun? <Link to="/login">Masuk di sini</Link>
  </p>
</div>
  {/* Button to go back */}
  <button onClick={handleBack} className="back-btn">Kembali</button>


          </div>
        </div>
      </form>
    </div>
  );
}


export default Register;
