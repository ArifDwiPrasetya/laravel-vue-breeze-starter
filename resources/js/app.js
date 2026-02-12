import "./bootstrap";
import "../css/app.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
// Menggunakan router di aplikasi Vue
app.use(router);

app.mount("#app");

// Opsional: Tunggu router siap sebelum mount (untuk kestabilan SPA)
// router.isReady().then(() => {
//     app.mount('#app');
// });
