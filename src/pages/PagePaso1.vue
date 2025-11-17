<script setup>
import { useRouter } from "vue-router/composables";
import { useMascotasStore } from "@/stores/mascotas";
import StepperProgress from "@/components/StepperProgress.vue";

const router = useRouter();
const mascotasStore = useMascotasStore();

const iniciarRegistro = () => {
  mascotasStore.setStep(1);
  router.push({ name: "paso-2" });
};
</script>

<template>
  <div class="tw-space-y-6">
    <!-- Stepper Progress -->
    <stepper-progress :current-step="1" :total-steps="4" />

    <!-- Welcome Card -->
    <v-card elevation="4" class="tw-overflow-hidden">
      <div class="tw-bg-gradient-to-r tw-from-primary tw-to-primary-dark tw-p-8 tw-text-white">
        <div class="tw-flex tw-items-center tw-justify-center tw-mb-4">
          <v-icon size="80" color="white">mdi-paw</v-icon>
        </div>
        <h1 class="tw-text-3xl tw-font-bold tw-text-center tw-mb-2">
          ¡Bienvenido al Registro de Mascotas!
        </h1>
        <p class="tw-text-center tw-text-lg tw-opacity-90">
          Registra a tu mejor amigo en unos simples pasos
        </p>
      </div>

      <v-card-text class="tw-p-8">
        <!-- Benefits -->
        <div class="tw-mb-8">
          <h2 class="tw-text-2xl tw-font-bold tw-mb-6 tw-text-center">
            ¿Por qué registrar a tu mascota?
          </h2>

          <v-row>
            <v-col v-for="(benefit, index) in benefits" :key="index" cols="12" md="6">
              <div class="tw-flex tw-items-start tw-gap-4 tw-p-4 tw-rounded-lg hover:tw-bg-gray-50 tw-transition-all">
                <v-avatar :color="benefit.color" size="56">
                  <v-icon large color="white">{{ benefit.icon }}</v-icon>
                </v-avatar>
                <div>
                  <h3 class="tw-font-bold tw-mb-1">{{ benefit.title }}</h3>
                  <p class="tw-text-sm tw-text-gray-600">
                    {{ benefit.description }}
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Steps Info -->
        <v-divider class="tw-my-6" />

        <div class="tw-mb-8">
          <h2 class="tw-text-xl tw-font-bold tw-mb-4 tw-text-center">
            Pasos del Registro
          </h2>

          <v-timeline dense class="tw-mt-4">
            <v-timeline-item
              v-for="(step, index) in steps"
              :key="index"
              :color="step.color"
              small
            >
              <template #icon>
                <v-icon small color="white">{{ step.icon }}</v-icon>
              </template>
              <div class="tw-pb-4">
                <h4 class="tw-font-semibold">{{ step.title }}</h4>
                <p class="tw-text-sm tw-text-gray-600">{{ step.description }}</p>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>

        <!-- CTA Button -->
        <div class="tw-flex tw-justify-center">
          <v-btn
            x-large
            color="primary"
            class="tw-px-12"
            @click="iniciarRegistro"
          >
            <v-icon left>mdi-paw</v-icon>
            Comenzar Registro
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      benefits: [
        {
          icon: "mdi-shield-check",
          color: "success",
          title: "Identificación Segura",
          description: "Mantén un registro completo y seguro de tu mascota",
        },
        {
          icon: "mdi-medical-bag",
          color: "error",
          title: "Historial Médico",
          description: "Guarda información importante sobre vacunas y salud",
        },
        {
          icon: "mdi-bell-ring",
          color: "warning",
          title: "Recordatorios",
          description: "Recibe alertas sobre citas veterinarias y vacunas",
        },
        {
          icon: "mdi-account-group",
          color: "info",
          title: "Comunidad",
          description: "Conecta con otros dueños de mascotas",
        },
      ],
      steps: [
        {
          icon: "mdi-paw",
          color: "primary",
          title: "Selecciona el tipo",
          description: "Elige qué tipo de mascota quieres registrar",
        },
        {
          icon: "mdi-form-textbox",
          color: "success",
          title: "Completa los datos",
          description: "Ingresa la información básica de tu mascota",
        },
        {
          icon: "mdi-file-document",
          color: "info",
          title: "Información adicional",
          description: "Agrega detalles sobre salud y características",
        },
        {
          icon: "mdi-check-circle",
          color: "success",
          title: "Confirma y finaliza",
          description: "Revisa la información y completa el registro",
        },
      ],
    };
  },
};
</script>
