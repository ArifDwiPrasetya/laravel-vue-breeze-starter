<script setup>
import api from "../lib/axios";

function send() {
    api.get("/api/say")
        .then((response) => {
            alert(response.data.message);
        })
        .catch((error) => {
            console.error("Error fetching message:", error);
        });
}
</script>
<template>
    <h1 class="text-5xl font-bold text-blue-600">Hello from Say Page!</h1>
    <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="send()"
    >
        Click me
    </button>
</template>
