// Fungsi untuk menghitung total pesanan berdasarkan userId
export const getTotalOrders = (orders, userId) => {
    // Validasi jika orders tidak ada atau bukan array
    if (!orders || !Array.isArray(orders)) return 0;
  
    // Filter pesanan yang sesuai dengan sellerId atau buyerId
    return orders.filter(
      (order) => order.sellerId === userId || order.buyerId === userId
    ).length;
  };
  