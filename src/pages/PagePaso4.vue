<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router/composables";
import { useMascotasStore } from "@/stores/mascotas";
import StepperProgress from "@/components/StepperProgress.vue";
import PetCard from "@/components/PetCard.vue";

const router = useRouter();
const mascotasStore = useMascotasStore();

const loading = ref(false);
const aceptaTerminos = ref(false);

const handleBack = () => {
  mascotasStore.prevStep();
  router.push({ name: "paso-3" });
};

const handleConfirmar = async () => {
  if (!aceptaTerminos.value) {
    alert("Debes aceptar los términos y condiciones");
    return;
  }

  loading.value = true;

  try {
    // Simular llamada API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Guardar mascota
    mascotasStore.agregarMascota(mascotasStore.mascotaActual);

    // Redirigir a página de éxito
    router.push({ name: "exito" });
  } catch (error) {
    alert("Error al registrar la mascota. Por favor intenta nuevamente.");
  } finally {
    loading.value = false;
  }
};

const handleEdit = () => {
  router.push({ name: "paso-2" });
};
</script>

<template>
  <div class="tw-space-y-6">
    <!-- Stepper Progress -->
    <stepper-progress :current-step="4" :total-steps="4" />

    <!-- Confirmation Card -->
    <v-card elevation="4">
      <v-card-title class="tw-bg-primary tw-text-white">
        <v-icon left color="white">mdi-check-circle</v-icon>
        Confirma la Información
      </v-card-title>

      <v-card-text class="tw-p-6">
        <div class="tw-space-y-6">
          <!-- Alert -->
          <v-alert type="info" text dense border="left">
            Por favor revisa cuidadosamente la información antes de confirmar el
            registro.
          </v-alert>

          <!-- Pet Preview -->
          <div>
            <div class="tw-flex tw-justify-between tw-items-center tw-mb-3">
              <h3 class="tw-text-lg tw-font-bold">Información de la Mascota</h3>
              <v-btn
                small
                color="primary"
                outlined
                @click="handleEdit"
              >
                <v-icon small left>mdi-pencil</v-icon>
                Editar
              </v-btn>
            </div>
            
            <pet-card :pet="mascotasStore.mascotaActual" />
          </div>

          <!-- Detailed Information -->
          <v-card outlined>
            <v-card-title class="tw-text-base">
              <v-icon left color="info">mdi-information</v-icon>
              Detalles Completos
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <tbody>
                  <tr>
                    <td class="tw-font-semibold tw-w-1/3">Tipo:</td>
                    <td>
                      <v-chip small color="primary" text-color="white">
                        {{ mascotasStore.mascotaActual.tipo || "No especificado" }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td class="tw-font-semibold">Nombre:</td>
                    <td>{{ mascotasStore.mascotaActual.nombre || "No especificado" }}</td>
                  </tr>
                  <tr>
                    <td class="tw-font-semibold">Raza:</td>
                    <td>{{ mascotasStore.mascotaActual.raza || "No especificada" }}</td>
                  </tr>
                  <tr>
                    <td class="tw-font-semibold">Edad:</td>
                    <td>
                      {{ mascotasStore.mascotaActual.edad
                        ? `${mascotasStore.mascotaActual.edad} ${mascotasStore.mascotaActual.edad === 1 ? 'año' : 'años'}`
                        : "No especificada"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="tw-font-semibold">Color:</td>
                    <td>{{ mascotasStore.mascotaActual.color || "No especificado" }}</td>
                  </tr>
                  <tr>
                    <td class="tw-font-semibold">Peso:</td>
                    <td>
                      {{ mascotasStore.mascotaActual.peso
                        ? `${mascotasStore.mascotaActual.peso} kg`
                        : "No especificado"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="tw-font-semibold">Vacunas al día:</td>
                    <td>
                      <v-chip
                        small
                        :color="mascotasStore.mascotaActual.vacunas ? 'success' : 'grey'"
                        text-color="white"
                      >
                        {{ mascotasStore.mascotaActual.vacunas ? "Sí" : "No" }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td class="tw-font-semibold">Esterilizado:</td>
                    <td>
                      <v-chip
                        small
                        :color="mascotasStore.mascotaActual.esterilizado ? 'success' : 'grey'"
                        text-color="white"
                      >
                        {{ mascotasStore.mascotaActual.esterilizado ? "Sí" : "No" }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr v-if="mascotasStore.mascotaActual.descripcion">
                    <td class="tw-font-semibold tw-align-top">Descripción:</td>
                    <td>{{ mascotasStore.mascotaActual.descripcion }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>

          <!-- Terms and Conditions -->
          <v-card outlined>
            <v-card-text>
              <v-checkbox
                v-model="aceptaTerminos"
                color="primary"
              >
                <template #label>
                  <div class="tw-text-sm">
                    Acepto los
                    <a href="#" class="tw-text-primary tw-underline" @click.prevent>
                      términos y condiciones
                    </a>
                    y la
                    <a href="#" class="tw-text-primary tw-underline" @click.prevent>
                      política de privacidad
                    </a>
                    del registro de mascotas.
                  </div>
                </template>
              </v-checkbox>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions class="tw-p-6 tw-flex tw-justify-between">
        <v-btn
          large
          outlined
          color="primary"
          :disabled="loading"
          @click="handleBack"
        >
          <v-icon left>mdi-arrow-left</v-icon>
          Atrás
        </v-btn>

        <v-btn
          large
          color="success"
          :loading="loading"
          :disabled="!aceptaTerminos"
          @click="handleConfirmar"
        >
          <v-icon left>mdi-check-circle</v-icon>
          Confirmar Registro
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

