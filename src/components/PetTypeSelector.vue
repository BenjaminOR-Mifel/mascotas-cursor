<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const petTypes = ref([
  {
    value: "perro",
    label: "Perro",
    icon: "mdi-dog",
    color: "brown",
    description: "El mejor amigo del hombre",
  },
  {
    value: "gato",
    label: "Gato",
    icon: "mdi-cat",
    color: "orange",
    description: "Independiente y cariñoso",
  },
  {
    value: "ave",
    label: "Ave",
    icon: "mdi-bird",
    color: "blue",
    description: "Colorido y cantarín",
  },
  {
    value: "conejo",
    label: "Conejo",
    icon: "mdi-rabbit",
    color: "pink",
    description: "Tierno y juguetón",
  },
  {
    value: "otro",
    label: "Otro",
    icon: "mdi-paw",
    color: "grey",
    description: "Otra mascota exótica",
  },
]);

const selectType = (type) => {
  emit("update:modelValue", type);
};
</script>

<template>
  <div class="pet-type-selector">
    <div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-5 tw-gap-4">
      <v-card
        v-for="type in petTypes"
        :key="type.value"
        :class="[
          'tw-cursor-pointer tw-transition-all tw-duration-300',
          {
            'tw-border-2 tw-border-primary': modelValue === type.value,
            'hover:tw-shadow-lg': modelValue !== type.value,
          },
        ]"
        :elevation="modelValue === type.value ? 8 : 2"
        @click="selectType(type.value)"
      >
        <v-card-text class="tw-text-center tw-p-4">
          <v-avatar
            :color="type.color"
            size="64"
            class="tw-mb-3"
          >
            <v-icon large color="white">{{ type.icon }}</v-icon>
          </v-avatar>

          <h4 class="tw-font-bold tw-mb-1">{{ type.label }}</h4>
          <p class="tw-text-xs tw-text-gray-600">
            {{ type.description }}
          </p>

          <v-icon
            v-if="modelValue === type.value"
            color="primary"
            class="tw-mt-2"
          >
            mdi-check-circle
          </v-icon>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.pet-type-selector .v-card {
  transition: all 0.3s ease;
}
</style>

