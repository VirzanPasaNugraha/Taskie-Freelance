export const formatDate = (date) => {
    if (!date || typeof date !== "string") {
        return "Tanggal tidak valid";
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return "Tanggal tidak valid";
    }

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    return parsedDate.toLocaleDateString("id-ID", options);
};
