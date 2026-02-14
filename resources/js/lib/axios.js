import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
    },
});

// lib/axios.js
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Jika server mati total (tidak ada response)
        if (!error.response) {
            alert("Koneksi ke server terputus.");
            return Promise.reject(error);
        }

        const { status } = error.response;

        // 1. CEK: Apakah ini sesi habis SAAT sudah login?
        // Kita hanya redirect jika status 401/419 DAN user tidak di halaman login
        if (
            [401, 419].includes(status) &&
            !window.location.pathname.includes("/login")
        ) {
            window.location.href = "/login";
            return Promise.reject(error); // Tetap reject agar tidak menggantung
        }

        // 2. Jika di halaman login dan error 401/422, biarkan lolos ke Catch
        if (
            status === 422 ||
            (status === 401 && window.location.pathname.includes("/login"))
        ) {
            return Promise.reject(error);
        }

        // 3. Error lainnya (misal 500)
        if (status === 500) {
            alert("Kesalahan Server (500)");
        }

        return Promise.reject(error);
    },
);

export default api;
