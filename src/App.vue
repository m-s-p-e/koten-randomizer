<script setup lang="ts">
import { ref } from "vue";
import HeaderNavbar from "./components/HeaderNavbar.vue";
import RandomizerMain from "./components/RandomizerMain.vue";

const names = ref<string[]>([]);

interface FormElements extends HTMLFormControlsCollection {
  "file-input": HTMLInputElement;
}

async function loadNames(e: Event) {
  const form = e.target as HTMLFormElement;
  const fileInput = (form.elements as FormElements)["file-input"];
  const [file] = fileInput.files || [];
  const text = await file.text();
  names.value = text.trim().split("\n");
}
</script>

<template>
  <HeaderNavbar @submit.prevent="loadNames" />
  <main class="container my-3">
    <RandomizerMain :names="names" />
  </main>
</template>

<style>
main {
  text-align: center;
}
</style>
