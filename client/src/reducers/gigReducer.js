// gigReducer.js

// Fungsi untuk mendapatkan dan mem-parsing data dari localStorage dengan aman
const getParsedUser = () => {
  try {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    console.error("Error saat parsing JSON:", error);
    return null; // Jika error, kembalikan nilai null
  }
};

// Inisialisasi state awal
export const INITIAL_STATE = {
  userId: getParsedUser()?._id || "", // Gunakan nilai default jika parsing gagal
  title: "",
  category: "",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

// Reducer untuk menangani state
export const gigReducer = (state, action) => {
  switch (action.type) {
    case "SET_GIG":
      return {
        ...state,
        ...action.payload,
      };
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };
    default:
      return state;
  }
};
