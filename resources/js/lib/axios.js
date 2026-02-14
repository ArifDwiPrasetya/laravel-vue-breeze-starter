import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { status, data } = error.response;

        // 1. Tangani Sesi Habis (401 atau 419)
        if ([401, 419].includes(status)) {
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }

        // 2. Tangani Error Server (500)
        if (status === 500) {
            alert(
                "Terjadi kesalahan pada server. Silakan hubungi IT Support HRIS.",
            );
        }

        // 3. Tangani Error Validasi (422)
        // Biasanya ini untuk form yang isiannya salah
        if (status === 422) {
            console.log("Data tidak valid:", data.errors);
            // Kamu bisa memicu notifikasi toast di sini
        }

        return Promise.reject(error);
    },
);

export default api;
