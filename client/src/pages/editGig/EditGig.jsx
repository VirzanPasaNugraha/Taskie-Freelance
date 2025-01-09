import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import "./EditGig.scss";

function EditGig() {
  const { id } = useParams(); // Get ID from URL
  const [gigData, setGigData] = useState(null);
  const [notification, setNotification] = useState(""); // Notification state
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent double submission
  const [coverImage, setCoverImage] = useState(null); // State to store cover image
  const [imageFiles, setImageFiles] = useState([]); // State to store additional images
  const navigate = useNavigate();

  const categoryTitleMapping = {
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

  useEffect(() => {
    const fetchGigData = async () => {
      try {
        const response = await newRequest.get(`/gigs/single/${id}`);
        setGigData(response.data);
        setLoading(false);

        if (response.data.cover) {
          setCoverImage(response.data.cover);
        }
        if (response.data.images && response.data.images.length > 0) {
          setImageFiles(response.data.images);
        }
      } catch (error) {
        console.error("Error fetching gig data:", error);
        setNotification("Error fetching gig data.");
        setLoading(false);
      }
    };

    fetchGigData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setGigData({
        ...gigData,
        category: value,
        title: categoryTitleMapping[value] || gigData.title,
      });
    } else {
      setGigData({
        ...gigData,
        [name]: value,
      });
    }
  };

  // Handle cover image file change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Format gambar yang diterima hanya JPEG, JPG, atau PNG');
      e.target.value = ''; // Reset input file
    } else {
      setCoverImage(file);
    }
  };

  // Handle additional images file change
  const handleImagesChange = (e) => {
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

    setImageFiles(validFiles);
  };

// Function to handle image upload to Cloudinary
const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "taskie"); // Cloudinary upload preset
    formData.append("api_key", "363955381251272"); // Replace with your Cloudinary API key
    formData.append("api_secret", "QzhVM_KD9DeZO6tJV26NIYp4eF8"); // Replace with your Cloudinary API secret
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dp9cdmt9s/image/upload`, // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
      return data.secure_url; // Return the Cloudinary image URL
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
      setNotification("Error uploading image.");
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!gigData.title || !gigData.price || !gigData.category) {
      setNotification("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      let coverImageUrl = gigData.cover; // Default to existing cover if not uploaded
      if (coverImage) {
        coverImageUrl = await uploadToCloudinary(coverImage); // Upload cover image to Cloudinary
      }

      let imageUrls = [];
      if (imageFiles.length > 0) {
        for (let file of imageFiles) {
          const imageUrl = await uploadToCloudinary(file); // Upload each additional image
          imageUrls.push(imageUrl);
        }
      }

      const updatedGig = {
        title: gigData.title,
        price: gigData.price,
        desc: gigData.desc,
        category: gigData.category,
        cover: coverImageUrl, // Assign the URL of the cover image
        shortTitle: gigData.shortTitle,
        shortDesc: gigData.shortDesc,
        deliveryTime: gigData.deliveryTime,
        revisionNumber: gigData.revisionNumber,
        images: imageUrls, // Assign the URLs of additional images
      };

      await newRequest.put(`/gigs/${id}`, updatedGig);

      setNotification("Gig successfully updated!");
      setTimeout(() => navigate("/myGigs"), 2000);
    } catch (error) {
      console.error("Error updating gig:", error);
      setNotification("Error updating gig.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-gig">
      <div className="container">
        <h2>Edit Gig</h2>

        {notification && <div className="notification">{notification}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={gigData.title}
              onChange={(e) =>
                setGigData({ ...gigData, title: e.target.value })
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={gigData.desc}
              onChange={(e) =>
                setGigData({ ...gigData, desc: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              value={gigData.price}
              onChange={(e) =>
                setGigData({ ...gigData, price: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={gigData.category || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Category
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
          </div>

          <div className="form-group">
            <label>Cover Image:</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleCoverImageChange}
            />
            {coverImage && <p>Selected Cover Image: {coverImage.name}</p>}
            {gigData.cover && !coverImage && <img src={gigData.cover} alt="Cover" />}
            <button
  type="button"
  disabled={isSubmitting || !coverImage}
  onClick={async () => {
    setIsSubmitting(true);
    setNotification("Uploading cover image...");
    await uploadToCloudinary(coverImage);
    setNotification("Cover image uploaded successfully!");
    setIsSubmitting(false);
  }}
>
  {isSubmitting ? "Uploading..." : "Upload Cover Image"}
</button>

          </div>

          <div className="form-group">
            <label>Upload Images:</label>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png"
              onChange={handleImagesChange}
            />
            {imageFiles.length > 0 && (
              <ul>
                {imageFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
            {gigData.images && gigData.images.length > 0 && (
              <div>
                <h4>Existing Images:</h4>
                <ul>
                  {gigData.images.map((image, index) => (
                    <li key={index}>
                      <img src={image} alt={`Image ${index + 1}`} width="100" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
<button
  type="button"
  disabled={isSubmitting || imageFiles.length === 0}
  onClick={async () => {
    setIsSubmitting(true);
    setNotification("Uploading images...");
    for (const file of imageFiles) {
      await uploadToCloudinary(file);
    }
    setNotification("Images uploaded successfully!");
    setIsSubmitting(false);
  }}
>
  {isSubmitting ? "Uploading..." : "Upload Images"}
</button>

          </div>

          <div className="form-group">
            <label>Short Title:</label>
            <input
              type="text"
              value={gigData.shortTitle}
              onChange={(e) =>
                setGigData({ ...gigData, shortTitle: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Short Description:</label>
            <textarea
              value={gigData.shortDesc}
              onChange={(e) =>
                setGigData({ ...gigData, shortDesc: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Delivery Time (in days):</label>
            <input
              type="number"
              value={gigData.deliveryTime}
              onChange={(e) =>
                setGigData({ ...gigData, deliveryTime: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Number of Revisions:</label>
            <input
              type="number"
              value={gigData.revisionNumber}
              onChange={(e) =>
                setGigData({ ...gigData, revisionNumber: e.target.value })
              }
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Update Gig"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditGig;


