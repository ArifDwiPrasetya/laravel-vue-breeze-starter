import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../pages/LoginView.vue";
import DashboardView from "../pages/DashboardView.vue";
import SayView from "../pages/say.vue";

import { useAuthStore } from "../stores/auth";

const routes = [
    {
        path: "/",
        name: "home",
        component: SayView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
        meta: { guestOnly: true }, // Hanya untuk yang belum login
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
        meta: { authOnly: true }, // Wajib login
    },
    {
        path: "/:catchall(.*)*",
        name: "Not Found",
        component: () => import("../pages/Error.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router/index.js
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // 1. Cek dulu apakah rute yang dituju butuh auth atau tidak
    const requiresAuth = to.meta.authOnly;
    const isGuestOnly = to.meta.guestOnly;

    // 2. HANYA panggil getUser jika user belum login DAN rute memang butuh proteksi
    // Ini mencegah getUser dipanggil terus-menerus di halaman login
    if (authStore.user === null && requiresAuth) {
        await authStore.getUser();
    }

    // 3. Logika pengalihan
    if (requiresAuth && !authStore.isLoggedIn) {
        return next({ name: "login" });
    }

    if (isGuestOnly && authStore.isLoggedIn) {
        return next({ name: "dashboard" });
    }

    next();
});

export default router;
