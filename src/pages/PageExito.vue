<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router/composables";
import { useMascotasStore } from "@/stores/mascotas";
import PetCard from "@/components/PetCard.vue";

const router = useRouter();
const mascotasStore = useMascotasStore();

const showConfetti = ref(false);
const ultimaMascota = ref(null);

onMounted(() => {
  showConfetti.value = true;
  
  // Obtener la última mascota registrada
  if (mascotasStore.mascotas.length > 0) {
    ultimaMascota.value = mascotasStore.mascotas[mascotasStore.mascotas.length - 1];
  }
  
  setTimeout(() => {
    showConfetti.value = false;
  }, 3000);
});

const registrarOtra = () => {
  mascotasStore.resetMascotaActual();
  mascotasStore.setStep(1);
  router.push({ name: "paso-1" });
};

const verMascotas = () => {
  router.push({ name: "mis-mascotas" });
};

const descargarCertificado = () => {
  // Implementar descarga de certificado
  alert("Certificado en preparación...");
};
</script>

<template>
  <div class="tw-space-y-6">
    <!-- Success Animation -->
    <div class="tw-flex tw-justify-center tw-mb-6">
      <v-avatar color="success" size="120">
        <v-icon size="80" color="white">mdi-check-circle</v-icon>
      </v-avatar>
    </div>

    <!-- Success Card -->
    <v-card elevation="8" class="tw-overflow-hidden">
      <div class="tw-bg-gradient-to-r tw-from-success tw-to-green-600 tw-p-8 tw-text-white tw-text-center">
        <h1 class="tw-text-3xl tw-font-bold tw-mb-2">
          ¡Registro Exitoso!
        </h1>
        <p class="tw-text-lg tw-opacity-90">
          Tu mascota ha sido registrada correctamente
        </p>
      </div>

      <v-card-text class="tw-p-8">
        <div class="tw-space-y-6">
          <!-- Registered Pet -->
          <div v-if="ultimaMascota">
            <h3 class="tw-text-xl tw-font-bold tw-mb-4 tw-text-center">
              Mascota Registrada
            </h3>
            <pet-card :pet="ultimaMascota" />
          </div>

          <!-- Registration Info -->
          <v-card outlined color="success lighten-5">
            <v-card-text>
              <div class="tw-space-y-4">
                <div class="tw-flex tw-items-start tw-gap-3">
                  <v-icon color="success">mdi-check-circle</v-icon>
                  <div>
                    <h4 class="tw-font-semibold">Registro Confirmado</h4>
                    <p class="tw-text-sm tw-text-gray-600">
                      Tu mascota ha sido agregada exitosamente a tu perfil
                    </p>
                  </div>
                </div>

                <v-divider />

                <div class="tw-flex tw-items-start tw-gap-3">
                  <v-icon color="info">mdi-email</v-icon>
                  <div>
                    <h4 class="tw-font-semibold">Confirmación Enviada</h4>
                    <p class="tw-text-sm tw-text-gray-600">
                      Hemos enviado un correo de confirmación con los detalles del
                      registro
                    </p>
                  </div>
                </div>

                <v-divider />

                <div class="tw-flex tw-items-start tw-gap-3">
                  <v-icon color="warning">mdi-shield-check</v-icon>
                  <div>
                    <h4 class="tw-font-semibold">Número de Registro</h4>
                    <p class="tw-text-sm tw-text-gray-600">
                      ID: <strong class="tw-font-mono">{{ ultimaMascota?.id || 'N/A' }}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>

          <!-- Next Steps -->
          <v-card outlined>
            <v-card-title class="tw-text-base">
              <v-icon left color="primary">mdi-information</v-icon>
              Próximos Pasos
            </v-card-title>
            <v-card-text>
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary">mdi-certificate</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Descarga tu certificado de registro</v-list-item-title>
                    <v-list-item-subtitle>
                      Disponible en formato PDF
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="success">mdi-calendar-check</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Configura recordatorios</v-list-item-title>
                    <v-list-item-subtitle>
                      Para vacunas y citas veterinarias
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="info">mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Únete a la comunidad</v-list-item-title>
                    <v-list-item-subtitle>
                      Conecta con otros dueños de mascotas
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>

          <!-- Actions -->
          <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
            <v-btn
              large
              color="primary"
              @click="descargarCertificado"
              block
            >
              <v-icon left>mdi-download</v-icon>
              Descargar Certificado
            </v-btn>

            <v-btn
              large
              color="success"
              outlined
              @click="registrarOtra"
              block
            >
              <v-icon left>mdi-plus</v-icon>
              Registrar Otra Mascota
            </v-btn>

            <v-btn
              large
              color="info"
              outlined
              @click="verMascotas"
              block
            >
              <v-icon left>mdi-view-list</v-icon>
              Ver Mis Mascotas
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Celebration Alert -->
    <v-alert
      v-if="showConfetti"
      type="success"
      prominent
      border="left"
      class="tw-animate-bounce"
    >
      <v-row align="center">
        <v-col class="grow">
          <strong>¡Felicidades!</strong> Has completado el registro de tu mascota.
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<style scoped>
.tw-animate-bounce {
  animation: bounce 1s ease-in-out;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>

