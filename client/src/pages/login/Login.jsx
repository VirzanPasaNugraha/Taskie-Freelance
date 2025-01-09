import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Login.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Validasi berdasarkan nama field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value) {
          error = "Username wajib diisi!";
        } else if (value.length < 3) {
          error = "Username harus minimal 3 karakter.";
        } else if (value.length > 12) {
          error = "Username tidak boleh lebih dari 12 karakter.";
        } else if (/[^a-zA-Z0-9]/.test(value)) {
          error = "Username hanya boleh mengandung huruf dan angka!";
        } else if (/\s/.test(value)) {
          error = "Username tidak boleh mengandung spasi!";
        }
        break;
      
      case "password":
        if (!value) {
          error = "Password wajib diisi!";
        } else if (value.length < 5) {
          error = "Password harus minimal 5 karakter.";
        }  else if (value.length > 12) {
          error = "Password tidak boleh lebih dari 12 karakter.";      
        } else if (/\s/.test(value)) {
          error = "Password tidak boleh mengandung spasi!";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validasi input secara langsung saat pengguna mengetik
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    // Update state
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when the form is submitting

    // Validasi semua field sebelum submit
    const newErrors = {
      username: validateField("username", username),
      password: validateField("password", password),
    };

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      setLoading(false); // Set loading to false when validation fails
      alert("Harap periksa kembali form Anda.");
      return;
    }

    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      toast.success("Login berhasil!");  // Notifikasi keberhasilan
      navigate("/");
      window.location.reload(); // Lakukan refresh halaman
    } catch (err) {
      
        // Tampilkan pesan error jika username atau password salah
        toast.error("Kata sandi atau username Anda salah.");
      } finally {
        setLoading(false); // Ensure loading is reset after request
    }
  };
  
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
  
    let parsedUser = null;
    if (storedUser) {
      try {
        parsedUser = JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing storedUser:", error);
      }
    }
  
    if (parsedUser) {
      setCurrentUser(parsedUser); // Set the currentUser state if a user is stored in localStorage
      navigate("/"); // Redirect to home if user is already logged in
    } else {
      // Optionally, redirect to login if no user is found
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="left">
        <h1>
                Taskie<span className="subtext">login.</span>
              </h1>


       {/* Username */}
<label htmlFor="username">Username</label>
<input
  name="username"
  type="text"
  placeholder="Masukkan username"
  value={username}
  onChange={handleChange}
  onKeyDown={(e) => {
    const value = e.target.value;

    // Cegah karakter yang tidak valid
    if (e.key === " " || e.keyCode === 32) {
      e.preventDefault(); // Mencegah spasi
      setErrors((prev) => ({
        ...prev,
        username: "Username tidak boleh mengandung spasi!",
      }));
    } else if (/[^a-zA-Z0-9]/.test(e.key)) {
      e.preventDefault(); // Mencegah karakter non-alfanumerik
      setErrors((prev) => ({
        ...prev,
        username: "Username hanya boleh mengandung huruf dan angka!",
      }));
    } else if (value.length >= 12 && e.key !== "Backspace") {
      e.preventDefault(); // Mencegah lebih dari 12 karakter
      setErrors((prev) => ({
        ...prev,
        username: "Username tidak boleh lebih dari 12 karakter!",
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

{/* Password */}
<label htmlFor="password">Password</label>
<input
  name="password"
  type="password"
  placeholder="Masukkan password"
  value={password}
  onChange={handleChange}
  onKeyDown={(e) => {
    const value = e.target.value;

    // Cegah spasi di password
    if (e.key === " " || e.keyCode === 32) {
      e.preventDefault(); // Mencegah spasi
      setErrors((prev) => ({
        ...prev,
        password: "Password tidak boleh mengandung spasi!",
      }));
    } else if (value.length >= 12 && e.key !== "Backspace") {
      e.preventDefault(); // Mencegah lebih dari 12 karakter
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
  }}
  required
/>
{errors.password && <span className="error">{errors.password}</span>}

          <button type="submit">Login</button>
           {/* Toast Notification Container */}
      <ToastContainer />

          {/* Pesan error global */}
          {error && <span className="error global">{error}</span>}

          {/* Link to Register Page */}
          <div className="register-link">
            <p>
              Belum punya akun?{" "}
              <a href="/register" style={{ color: "#007bff", textDecoration: "none" }}>
                Daftar Sekarang
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
