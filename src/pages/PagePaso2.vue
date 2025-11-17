<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router/composables";
import { useMascotasStore } from "@/stores/mascotas";
import StepperProgress from "@/components/StepperProgress.vue";
import PetForm from "@/components/PetForm.vue";

const router = useRouter();
const mascotasStore = useMascotasStore();

const formValid = ref(false);
const formRef = ref(null);

const handleBack = () => {
  mascotasStore.prevStep();
  router.push({ name: "paso-1" });
};

const handleNext = () => {
  if (mascotasStore.mascotaActual.tipo && mascotasStore.mascotaActual.nombre) {
    mascotasStore.nextStep();
    router.push({ name: "paso-3" });
  } else {
    // Mostrar mensaje de error
    alert("Por favor completa los campos obligatorios");
  }
};
</script>

<template>
  <div class="tw-space-y-6">
    <!-- Stepper Progress -->
    <stepper-progress :current-step="2" :total-steps="4" />

    <!-- Form Card -->
    <v-card elevation="4">
      <v-card-title class="tw-bg-primary tw-text-white">
        <v-icon left color="white">mdi-form-textbox</v-icon>
        Datos de tu Mascota
      </v-card-title>

      <v-card-text class="tw-p-6">
        <div class="tw-mb-4">
          <v-alert type="info" text dense border="left">
            <strong>Información requerida:</strong> Por favor completa los campos
            marcados con asterisco (*) para continuar.
          </v-alert>
        </div>

        <pet-form
          ref="formRef"
          v-model="mascotasStore.mascotaActual"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions class="tw-p-6 tw-flex tw-justify-between">
        <v-btn
          large
          outlined
          color="primary"
          @click="handleBack"
        >
          <v-icon left>mdi-arrow-left</v-icon>
          Atrás
        </v-btn>

        <v-btn
          large
          color="primary"
          @click="handleNext"
          :disabled="!mascotasStore.mascotaActual.tipo || !mascotasStore.mascotaActual.nombre"
        >
          Continuar
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

