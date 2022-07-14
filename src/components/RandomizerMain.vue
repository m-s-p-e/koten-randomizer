<template>
  <div class="card text-center mx-auto" style="max-width: 60ch">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs flex-column flex-sm-row">
        <li class="nav-item me-sm-auto">
          <a
            :class="['nav-link', view === 'current' ? 'active' : '']"
            href="#"
            @click="view = 'current'"
          >
            Aktuelles Team
            <span class="badge rounded-pill bg-primary">
              {{ choosen.length }}
            </span>
          </a>
        </li>
        <li class="nav-item">
          <a
            :class="['nav-link', view === 'pending' ? 'active' : '']"
            href="#"
            @click="view = 'pending'"
          >
            Pool
            <span class="badge rounded-pill bg-primary">
              {{ pending.length }}
            </span>
          </a>
        </li>
        <li class="nav-item">
          <a
            :class="['nav-link', view === 'eliminated' ? 'active' : '']"
            href="#"
            @click="view = 'eliminated'"
          >
            Ausgeschieden
            <span class="badge rounded-pill bg-primary">
              {{ eliminated.length }}
            </span>
          </a>
        </li>
      </ul>
    </div>
    <div v-if="view === 'current'" class="card-body">
      <h5 class="card-title">Aktuelles Team</h5>
      <div class="card-text vstack gap-3">
        <div class="input-group">
          <input
            v-model="teamSize"
            type="number"
            class="form-control text-center"
          />
          <button
            @click="newKote"
            :disabled="pending.length < teamSize"
            class="btn btn-primary flex-grow-1"
          >
            Neuer Kote
          </button>
        </div>
        <ul v-if="choosen.length" class="list-group">
          <li
            v-for="name in choosen"
            :key="name"
            class="list-group-item d-flex justify-content-between"
          >
            <button @click="moveKoteBack(name)" class="badge border-0">
              ♻️
            </button>
            <span>
              {{ name }}
            </span>
            <button @click="moveKoteAhead(name)" class="badge border-0">
              🗑️
            </button>
          </li>
        </ul>
        <button
          @click="clearTeam"
          :disabled="!choosen.length"
          class="btn btn-danger"
        >
          🗑️ Auswahl zurücksetzen
        </button>
      </div>
    </div>
    <div v-else-if="view === 'pending'" class="card-body">
      <h5 class="card-title">Ausstehende Koten</h5>
      <ul class="list-group">
        <li v-for="name in pending" :key="name" class="list-group-item">
          {{ name }}
        </li>
      </ul>
    </div>
    <div v-else class="card-body">
      <h5 class="card-title">Ausgeschiedene Koten</h5>
      <div class="card-text vstack gap-3">
        <button
          @click="resetEliminated"
          :disabled="!eliminated.length"
          class="btn btn-primary"
        >
          ♻️ Zum Pool hinzufügen
        </button>
        <ul v-if="eliminated.length" class="list-group">
          <li v-for="name in eliminated" :key="name" class="list-group-item">
            {{ name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocalStorage } from "@vueuse/core";
import { ref, watch } from "vue";

const props = defineProps<{ names: string[] }>();

console.log(props.names[0]);

const pending = useLocalStorage<string[]>("pending", []);
const choosen = useLocalStorage<string[]>("choosen", []);
const eliminated = useLocalStorage<string[]>("eliminated", []);
const teamSize = ref(1);
const view = ref("current");

watch(
  () => props.names,
  (names) => {
    pending.value = names;
    choosen.value = [];
    eliminated.value = [];
  }
);

function newKote() {
  for (let index = 0; index < teamSize.value; index++) {
    const name =
      pending.value[Math.floor(pending.value.length * Math.random())];
    choosen.value.push(name);
    pending.value = pending.value.filter((k) => k != name);
  }
}

function moveKoteBack(name: string) {
  pending.value.push(name);
  choosen.value = choosen.value.filter((k) => k != name);
}

function moveKoteAhead(name: string) {
  eliminated.value.push(name);
  choosen.value = choosen.value.filter((k) => k != name);
}

function clearTeam() {
  eliminated.value.push(...choosen.value);
  choosen.value = [];
}

function resetEliminated() {
  pending.value.push(...eliminated.value);
  eliminated.value = [];
}
</script>
