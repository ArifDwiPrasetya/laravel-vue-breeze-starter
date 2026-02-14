<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-6 text-center">
                Login ke Aplikasi
            </h2>

            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label class="block text-gray-700">Email</label>
                    <input
                        v-model="form.email"
                        type="email"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autocomplete="email"
                        required
                    />
                </div>

                <div class="mb-6">
                    <label class="block text-gray-700">Password</label>
                    <input
                        v-model="form.password"
                        type="password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autocomplete="current-password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                >
                    {{ loading ? "Sedang Masuk..." : "Login" }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../lib/axios";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);
const form = ref({
    email: "",
    password: "",
});

const handleLogin = async () => {
    loading.value = true;
    try {
        // 1. Inisialisasi CSRF Protection (Wajib Breeze API)
        await api.get("/sanctum/csrf-cookie");

        // 2. Kirim data login ke endpoint Breeze
        await api.post("/login", form.value);

        await authStore.getUser();

        // 3. Jika berhasil, arahkan ke dashboard
        router.push({ name: "dashboard" });
    } catch (error) {
        alert(
            "Login Gagal: " +
                (error.response?.data?.message || "Terjadi kesalahan"),
        );
    } finally {
        loading.value = false;
    }
};
</script>
