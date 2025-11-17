<script setup>
import { computed } from "vue";

const props = defineProps({
  pet: {
    type: Object,
    required: true,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click", "edit", "delete"]);

const petIcon = computed(() => {
  const icons = {
    perro: "mdi-dog",
    gato: "mdi-cat",
    ave: "mdi-bird",
    otro: "mdi-paw",
  };
  return icons[props.pet.tipo?.toLowerCase()] || "mdi-paw";
});

const handleClick = () => {
  if (props.clickable) {
    emit("click", props.pet);
  }
};
</script>

<template>
  <v-card
    :class="[
      'pet-card tw-transition-all tw-duration-300',
      {
        'tw-cursor-pointer hover:tw-shadow-lg': clickable,
        'tw-border-2 tw-border-primary': selected,
      },
    ]"
    :elevation="selected ? 8 : 2"
    @click="handleClick"
  >
    <v-card-text class="tw-p-4">
      <div class="tw-flex tw-items-start tw-gap-4">
        <!-- Pet Icon -->
        <v-avatar :color="pet.color || 'primary'" size="64" class="tw-flex-shrink-0">
          <v-icon large color="white">{{ petIcon }}</v-icon>
        </v-avatar>

        <!-- Pet Info -->
        <div class="tw-flex-1">
          <h3 class="tw-text-lg tw-font-bold tw-mb-1">
            {{ pet.nombre || "Sin nombre" }}
          </h3>

          <div class="tw-flex tw-flex-wrap tw-gap-2 tw-mb-2">
            <v-chip small color="primary" text-color="white">
              <v-icon small left>{{ petIcon }}</v-icon>
              {{ pet.tipo || "Tipo no especificado" }}
            </v-chip>

            <v-chip v-if="pet.raza" small outlined>
              {{ pet.raza }}
            </v-chip>

            <v-chip v-if="pet.edad" small outlined>
              {{ pet.edad }}
              {{ pet.edad === 1 ? "año" : "años" }}
            </v-chip>
          </div>

          <div v-if="pet.descripcion" class="tw-text-sm tw-text-gray-600">
            {{ pet.descripcion }}
          </div>
        </div>

        <!-- Actions -->
        <div v-if="!clickable" class="tw-flex tw-flex-col tw-gap-2">
          <v-btn
            icon
            small
            color="primary"
            @click.stop="emit('edit', pet)"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            icon
            small
            color="error"
            @click.stop="emit('delete', pet)"
          >
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.pet-card {
  transition: all 0.3s ease;
}
</style>

