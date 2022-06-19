<template>
  <div>
    <input type="file" @change="uploadNames" />
    <button @click="reset">Reset all</button>
  </div>
  <div class="columns">
    <div>
      <h3>Ausstehende Koten ({{ pending.length }})</h3>
      <ul>
        <li v-for="name in pending" :key="name">{{ name }}</li>
      </ul>
    </div>
    <div>
      <h3>Aktuelles Team ({{ choosen.length }})</h3>
      <button @click="newKote" :disabled="!pending.length">
        🔀🗳️🎰 Neuer Kote
      </button>
      <br />
      <button @click="clearTeam" :disabled="!pending.length">
        🗑️ Auswahl zurücksetzen
      </button>
      <ul>
        <li v-for="name in choosen" :key="name">{{ name }}</li>
      </ul>
    </div>
    <div>
      <h3>Ausgeschiedene Koten ({{ eliminated.length }})</h3>
      <button @click="resetEliminated" :disabled="!eliminated.length">
        ♻️ Zum Pool hinzufügen
      </button>
      <ul>
        <li v-for="name in eliminated" :key="name">{{ name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocalStorage } from "@vueuse/core";

const allNames = useLocalStorage<string[]>("allNames", []);
const pending = useLocalStorage<string[]>("pending", []);
const choosen = useLocalStorage<string[]>("choosen", []);
const eliminated = useLocalStorage<string[]>("eliminated", []);

function newKote() {
  const name = pending.value[Math.floor(pending.value.length * Math.random())];
  choosen.value.push(name);
  pending.value = pending.value.filter((k) => k != name);
}

function clearTeam() {
  eliminated.value.push(...choosen.value);
  choosen.value = [];
}

function resetEliminated() {
  pending.value.push(...eliminated.value);
  eliminated.value = [];
}

function reset() {
  pending.value = allNames.value;
  choosen.value = [];
  eliminated.value = [];
}

async function uploadNames(e: Event) {
  const elem = e.target as HTMLInputElement;
  if (!elem.files) return;
  const [file] = elem.files;
  const text = await file.text();
  const names = text.trim().split("\n");
  allNames.value = names;
}
</script>

<style scoped>
.columns {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
}

ul {
  padding: 0;
  list-style: none;
}
</style>
