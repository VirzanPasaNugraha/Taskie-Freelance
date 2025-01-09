const validateGigUpdate = (req, res, next) => {
    const { title, desc, category, price, cover, shortTitle, shortDesc, deliveryTime, revisionNumber, sales } = req.body;

    // Pastikan semua field yang diperlukan ada
    if (!title || !desc || !category || !price || !cover || !shortTitle || !shortDesc || !deliveryTime || !revisionNumber) {
      return res.status(400).json({ message: "Beberapa field wajib tidak diisi" });
    }

    // Validasi harga
    if (price < 0) {
      return res.status(400).json({ message: "Harga harus berupa angka positif" });
    }

    // Jika sales ada dalam body request, pastikan itu tidak bisa diubah
    if (sales) {
      return res.status(400).json({ message: "Sales tidak dapat diubah secara manual" });
    }

    next();
};

export default validateGigUpdate;
