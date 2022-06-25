<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MSPE</a>
      <form class="d-flex ms-auto">
        <div class="input-group">
          <input
            type="file"
            class="form-control"
            name="file-input"
            required
            @change="updateFileInput"
          />
          <button class="btn btn-primary">Koten einlesen</button>
        </div>
      </form>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const loadedNames = ref<string[]>([]);

async function updateFileInput(e: Event) {
  const input = e.target as HTMLInputElement;

  if (!input.files) return;
  const [file] = input.files;
  const text = await file.text();
  loadedNames.value = text.trim().split("\n");
}
</script>
