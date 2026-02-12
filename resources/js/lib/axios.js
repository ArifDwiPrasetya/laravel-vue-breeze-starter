import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000", // Pastikan ini URL server Laravel Anda
    withCredentials: true, // WAJIB: Agar browser mengirim cookie session
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
    },
});

export default api;
