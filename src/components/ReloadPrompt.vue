<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div v-if="offlineReady || needRefresh" class="toast show" role="alert">
      <div class="toast-body">
        <span v-if="offlineReady">App ready to work offline</span>
        <span v-else>
          New content available, click on reload button to update.
        </span>
        <hr class="my-2" />
        <div class="d-flex justify-items-end">
          <button
            v-if="needRefresh"
            @click="updateServiceWorker()"
            class="btn btn-primary btn-sm me-2"
          >
            Reload
          </button>
          <button @click="close" class="btn btn-secondary btn-sm">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRegisterSW } from "virtual:pwa-register/vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};
</script>
