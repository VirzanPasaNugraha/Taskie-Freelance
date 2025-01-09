const createError = (status, message) => {
  const err = new Error(message);  // Menambahkan message pada error
  err.status = status;  // Menyimpan status pada error
  Error.captureStackTrace(err, createError);  // Menambahkan stack trace (opsional)
  
  return err;
};

export default createError;
