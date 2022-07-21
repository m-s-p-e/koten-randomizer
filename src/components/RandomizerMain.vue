<template>
  <div class="card text-center randomizer-card">
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
              {{ listState.choosen.length }}
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
              {{ listState.pending.length }}
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
              {{ listState.eliminated.length }}
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
            :disabled="listState.pending.length < teamSize"
            class="btn btn-primary flex-grow-1"
          >
            Neuer Kote
          </button>
        </div>
        <ul v-if="listState.choosen.length" class="list-group">
          <li
            v-for="name in listState.choosen"
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
          :disabled="!listState.choosen.length"
          class="btn btn-danger"
        >
          🗑️ Auswahl zurücksetzen
        </button>
      </div>
    </div>
    <div v-else-if="view === 'pending'" class="card-body">
      <h5 class="card-title">Ausstehende Koten</h5>
      <ul class="list-group">
        <li
          v-for="name in listState.pending"
          :key="name"
          class="list-group-item"
        >
          {{ name }}
        </li>
      </ul>
    </div>
    <div v-else class="card-body">
      <h5 class="card-title">Ausgeschiedene Koten</h5>
      <div class="card-text vstack gap-3">
        <button
          @click="resetEliminated"
          :disabled="!listState.eliminated.length"
          class="btn btn-primary"
        >
          ♻️ Zum Pool hinzufügen
        </button>
        <ul v-if="listState.eliminated.length" class="list-group">
          <li
            v-for="name in listState.eliminated"
            :key="name"
            class="list-group-item"
          >
            {{ name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="card-footer">
      <button type="button" @click="removeList" class="btn-close"></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalState } from "@/store";
import { computed, ref } from "vue";

const props = defineProps<{ listIndex: number }>();
const teamSize = ref(1);
const view = ref("current");

const lists = useGlobalState();
const listState = computed(() => lists.value[props.listIndex]);

function newKote() {
  for (let index = 0; index < teamSize.value; index++) {
    const name =
      listState.value.pending[
        Math.floor(listState.value.pending.length * Math.random())
      ];
    listState.value.choosen.push(name);
    listState.value.pending = listState.value.pending.filter((k) => k != name);
  }
}

function moveKoteBack(name: string) {
  listState.value.pending.push(name);
  listState.value.choosen = listState.value.choosen.filter((k) => k != name);
}

function moveKoteAhead(name: string) {
  listState.value.eliminated.push(name);
  listState.value.choosen = listState.value.choosen.filter((k) => k != name);
}

function clearTeam() {
  listState.value.eliminated.push(...listState.value.choosen);
  listState.value.choosen = [];
}

function resetEliminated() {
  listState.value.pending.push(...listState.value.eliminated);
  listState.value.eliminated = [];
}

function removeList() {
  if (!window.confirm("Diese Liste löschen?")) return;
  lists.value.splice(props.listIndex, 1);
}
</script>

<style>
.randomizer-card {
  max-width: 70ch;
}
</style>
