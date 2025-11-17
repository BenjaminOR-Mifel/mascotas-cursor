<script setup>
import { ref, watch, computed } from "vue";
import PetTypeSelector from "./PetTypeSelector.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);

const formData = ref({
  tipo: props.modelValue.tipo || "",
  nombre: props.modelValue.nombre || "",
  raza: props.modelValue.raza || "",
  edad: props.modelValue.edad || null,
  color: props.modelValue.color || "",
  peso: props.modelValue.peso || null,
  descripcion: props.modelValue.descripcion || "",
  vacunas: props.modelValue.vacunas || false,
  esterilizado: props.modelValue.esterilizado || false,
  ...props.modelValue,
});

const razasPorTipo = computed(() => {
  const razas = {
    perro: [
      "Labrador",
      "Golden Retriever",
      "Bulldog",
      "Pastor Alemán",
      "Chihuahua",
      "Beagle",
      "Poodle",
      "Mestizo",
      "Otro",
    ],
    gato: [
      "Persa",
      "Siamés",
      "Maine Coon",
      "Bengalí",
      "Angora",
      "Esfinge",
      "Mestizo",
      "Otro",
    ],
    ave: ["Canario", "Periquito", "Loro", "Cacatúa", "Agapornis", "Otro"],
    conejo: ["Holandés", "Belier", "Angora", "Rex", "Mestizo", "Otro"],
    otro: ["Otro"],
  };
  return razas[formData.value.tipo] || [];
});

watch(
  formData,
  (newValue) => {
    emit("update:modelValue", { ...newValue });
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      formData.value = { ...formData.value, ...newValue };
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="pet-form">
    <v-form>
      <!-- Tipo de Mascota -->
      <div class="tw-mb-6">
        <label class="tw-block tw-text-sm tw-font-semibold tw-mb-3">
          Tipo de Mascota *
        </label>
        <pet-type-selector v-model="formData.tipo" />
      </div>

      <!-- Información Básica -->
      <v-card class="tw-mb-4" elevation="0" outlined>
        <v-card-title class="tw-text-base">
          <v-icon left color="primary">mdi-information</v-icon>
          Información Básica
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.nombre"
                label="Nombre de la mascota"
                outlined
                dense
                prepend-inner-icon="mdi-form-textbox"
                :rules="[(v) => !!v || 'El nombre es requerido']"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="formData.raza"
                :items="razasPorTipo"
                label="Raza"
                outlined
                dense
                prepend-inner-icon="mdi-dna"
                :disabled="!formData.tipo"
                :rules="[(v) => !!v || 'La raza es requerida']"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="formData.edad"
                label="Edad (años)"
                outlined
                dense
                type="number"
                min="0"
                max="50"
                prepend-inner-icon="mdi-calendar"
                :rules="[(v) => v >= 0 || 'La edad debe ser positiva']"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.color"
                label="Color"
                outlined
                dense
                prepend-inner-icon="mdi-palette"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="formData.peso"
                label="Peso (kg)"
                outlined
                dense
                type="number"
                min="0"
                step="0.1"
                prepend-inner-icon="mdi-weight-kilogram"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Información de Salud -->
      <v-card class="tw-mb-4" elevation="0" outlined>
        <v-card-title class="tw-text-base">
          <v-icon left color="success">mdi-medical-bag</v-icon>
          Información de Salud
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-switch
                v-model="formData.vacunas"
                label="Vacunas al día"
                color="success"
                inset
                class="tw-mt-0"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-switch
                v-model="formData.esterilizado"
                label="Esterilizado/Castrado"
                color="success"
                inset
                class="tw-mt-0"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Descripción -->
      <v-card elevation="0" outlined>
        <v-card-title class="tw-text-base">
          <v-icon left color="info">mdi-text</v-icon>
          Descripción Adicional
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="formData.descripcion"
            label="Descripción adicional de tu mascota"
            outlined
            rows="3"
            prepend-inner-icon="mdi-text"
            counter="500"
            :rules="[
              (v) =>
                !v || v.length <= 500 || 'Máximo 500 caracteres',
            ]"
          />
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>

<style scoped>
.pet-form {
  width: 100%;
}
</style>

