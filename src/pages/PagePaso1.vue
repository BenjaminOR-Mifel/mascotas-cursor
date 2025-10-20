<script setup>
import { ref } from "vue";

const counter = ref(0);
</script>

<template>
  <div>
    <v-card class="tw-p-4" elevation="2">
      <div class="tw-text-xl tw-mb-2">Contador</div>

      <div class="tw-text-center tw-text-4xl tw-font-bold tw-mb-4">
        {{ counter }}
      </div>

      <div class="tw-grid tw-grid-cols-3 tw-gap-4 tw-justify-items-center">
        <v-btn fab color="success" class="mx-3" @click="counter++">
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn fab color="error" class="mx-3" @click="counter--">
          <v-icon>mdi-minus</v-icon>
        </v-btn>

        <v-btn fab color="primary" variant="outlined" @click="counter = 0">
          <v-icon>mdi-restart</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
