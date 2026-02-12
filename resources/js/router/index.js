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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // Pastikan kita sudah mencoba mengambil data user jika statusnya masih kosong
    if (authStore.user === null) {
        await authStore.getUser();
    }

    // Jika rute butuh AUTH tapi user belum login
    if (to.meta.authOnly && !authStore.isLoggedIn) {
        next({ name: "login" });
    }
    // Jika rute khusus GUEST (seperti login) tapi user sudah login
    else if (to.meta.guestOnly && authStore.isLoggedIn) {
        next({ name: "dashboard" });
    } else {
        next();
    }
});

export default router;
