<template>
  <HeaderNavbar @submit.prevent="loadNames" />
  <main
    class="d-flex justify-content-evenly align-items-start flex-wrap gap-3 m-3"
  >
    <RandomizerMain v-for="(list, i) in lists" :key="i" :listIndex="i" />
  </main>
  <ReloadPrompt />
</template>

<script setup lang="ts">
import HeaderNavbar from "./components/HeaderNavbar.vue";
import RandomizerMain from "./components/RandomizerMain.vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";
import { useGlobalState } from "./store";

const lists = useGlobalState();

interface FormElements extends HTMLFormControlsCollection {
  "file-input": HTMLInputElement;
}

async function loadNames(e: Event) {
  const form = e.target as HTMLFormElement;
  const fileInput = (form.elements as FormElements)["file-input"];
  const [file] = fileInput.files || [];
  const text = await file.text();
  lists.value.push({
    pending: text.trim().split("\n"),
    choosen: [],
    eliminated: [],
  });
}
</script>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
main {
  text-align: center;
}
</style>
