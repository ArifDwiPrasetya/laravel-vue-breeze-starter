import { defineStore } from "pinia";
import api from "../lib/axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        isLoggedIn: false,
    }),
    actions: {
        async getUser() {
            try {
                const response = await api.get("/api/user");
                this.user = response.data;
                this.isLoggedIn = true;
            } catch (error) {
                this.user = null;
                this.isLoggedIn = false;
            }
        },
        async logout() {
            try {
                await api.post("/logout"); // Hapus session di server
            } finally {
                // Tetap hapus data di frontend meskipun request server gagal
                this.user = null;
                this.isLoggedIn = false;
            }
        },
    },
});
