/** @type {import('tailwindcss').Config} */
export default {
    // 1. Menentukan file mana yang dipantau
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],

    theme: {
        // 2. Tempat modifikasi desain (warna, font, dll)
        extend: {
            colors: {
                "hris-blue": "#1e40af", // Contoh menambah warna custom
            },
        },
    },

    // 3. Menambahkan fitur tambahan jika perlu
    plugins: [],
};
