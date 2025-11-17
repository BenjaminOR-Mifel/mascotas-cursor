<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router/composables";
import { useMascotasStore } from "@/stores/mascotas";
import StepperProgress from "@/components/StepperProgress.vue";

const router = useRouter();
const mascotasStore = useMascotasStore();

const documentos = ref({
  certificadoVacunas: null,
  certificadoNacimiento: null,
  fotoMascota: null,
});

const contactoEmergencia = ref({
  nombre: "",
  telefono: "",
  relacion: "",
});

const veterinario = ref({
  nombre: "",
  clinica: "",
  telefono: "",
  direccion: "",
});

const handleBack = () => {
  mascotasStore.prevStep();
  router.push({ name: "paso-2" });
};

const handleNext = () => {
  mascotasStore.nextStep();
  router.push({ name: "paso-4" });
};

const handleFileUpload = (type, event) => {
  const file = event.target.files[0];
  if (file) {
    documentos.value[type] = file;
  }
};
</script>

<template>
  <div class="tw-space-y-6">
    <!-- Stepper Progress -->
    <stepper-progress :current-step="3" :total-steps="4" />

    <!-- Information Card -->
    <v-card elevation="4">
      <v-card-title class="tw-bg-primary tw-text-white">
        <v-icon left color="white">mdi-file-document</v-icon>
        Información Adicional
      </v-card-title>

      <v-card-text class="tw-p-6">
        <div class="tw-space-y-6">
          <!-- Documentos -->
          <v-card outlined>
            <v-card-title class="tw-text-base">
              <v-icon left color="primary">mdi-file-upload</v-icon>
              Documentos (Opcional)
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-file-input
                    v-model="documentos.certificadoVacunas"
                    label="Certificado de Vacunas"
                    outlined
                    dense
                    prepend-icon="mdi-file-document"
                    accept="image/*,application/pdf"
                    @change="handleFileUpload('certificadoVacunas', $event)"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-file-input
                    v-model="documentos.certificadoNacimiento"
                    label="Certificado de Nacimiento"
                    outlined
                    dense
                    prepend-icon="mdi-file-document"
                    accept="image/*,application/pdf"
                    @change="handleFileUpload('certificadoNacimiento', $event)"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-file-input
                    v-model="documentos.fotoMascota"
                    label="Foto de la Mascota"
                    outlined
                    dense
                    prepend-icon="mdi-camera"
                    accept="image/*"
                    @change="handleFileUpload('fotoMascota', $event)"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Contacto de Emergencia -->
          <v-card outlined>
            <v-card-title class="tw-text-base">
              <v-icon left color="error">mdi-phone-alert</v-icon>
              Contacto de Emergencia (Opcional)
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="contactoEmergencia.nombre"
                    label="Nombre completo"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="contactoEmergencia.telefono"
                    label="Teléfono"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                    type="tel"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="contactoEmergencia.relacion"
                    label="Relación"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account-heart"
                    placeholder="Ej: Familiar, Amigo"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Veterinario -->
          <v-card outlined>
            <v-card-title class="tw-text-base">
              <v-icon left color="success">mdi-medical-bag</v-icon>
              Información del Veterinario (Opcional)
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="veterinario.nombre"
                    label="Nombre del veterinario"
                    outlined
                    dense
                    prepend-inner-icon="mdi-doctor"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="veterinario.clinica"
                    label="Clínica veterinaria"
                    outlined
                    dense
                    prepend-inner-icon="mdi-hospital-building"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="veterinario.telefono"
                    label="Teléfono"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                    type="tel"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="veterinario.direccion"
                    label="Dirección"
                    outlined
                    dense
                    prepend-inner-icon="mdi-map-marker"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Info Alert -->
          <v-alert type="info" text dense border="left">
            <strong>Nota:</strong> Esta información es opcional pero nos ayuda a
            brindarte un mejor servicio en caso de emergencia.
          </v-alert>
        </div>
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
        >
          Continuar
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

