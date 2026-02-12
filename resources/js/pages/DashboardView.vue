<template>
    <div class="p-8">
        <h1 class="text-2xl font-bold">Selamat Datang di Dashboard!</h1>
        <p class="mt-4 text-gray-600">
            Anda berhasil login menggunakan Session Breeze.
        </p>

        <button
            @click="handleLogout"
            class="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
            Logout
        </button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth"; // Import store

const router = useRouter();
const authStore = useAuthStore(); // Inisialisasi store

const handleLogout = async () => {
    try {
        // Panggil action logout dari Pinia store
        await authStore.logout();

        // Sekarang router.push akan berhasil karena state di Pinia sudah bersih
        router.push({ name: "login" });
    } catch (error) {
        console.error("Gagal logout", error);
    }
};
</script>
