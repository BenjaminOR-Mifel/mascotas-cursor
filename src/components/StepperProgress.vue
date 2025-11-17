<script setup>
import { computed } from "vue";

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  totalSteps: {
    type: Number,
    default: 4,
  },
  steps: {
    type: Array,
    default: () => [
      { label: "Bienvenida", icon: "mdi-paw" },
      { label: "Datos", icon: "mdi-form-textbox" },
      { label: "Información", icon: "mdi-file-document" },
      { label: "Confirmación", icon: "mdi-check-circle" },
    ],
  },
});

const progressPercentage = computed(() => {
  return (props.currentStep / props.totalSteps) * 100;
});

const getStepStatus = (stepIndex) => {
  if (stepIndex < props.currentStep) return "completed";
  if (stepIndex === props.currentStep) return "active";
  return "pending";
};
</script>

<template>
  <div class="stepper-progress">
    <!-- Progress Bar -->
    <v-progress-linear
      :value="progressPercentage"
      color="primary"
      height="6"
      rounded
      class="tw-mb-6"
    />

    <!-- Steps -->
    <div class="tw-flex tw-justify-between tw-items-start tw-relative">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="tw-flex tw-flex-col tw-items-center tw-flex-1"
      >
        <!-- Step Circle -->
        <div
          class="tw-relative tw-z-10 tw-mb-2"
          :class="{
            'tw-opacity-50': getStepStatus(index + 1) === 'pending',
          }"
        >
          <v-avatar
            :color="
              getStepStatus(index + 1) === 'completed'
                ? 'success'
                : getStepStatus(index + 1) === 'active'
                ? 'primary'
                : 'grey lighten-2'
            "
            size="48"
          >
            <v-icon
              :color="
                getStepStatus(index + 1) === 'pending' ? 'grey' : 'white'
              "
            >
              {{
                getStepStatus(index + 1) === "completed"
                  ? "mdi-check"
                  : step.icon
              }}
            </v-icon>
          </v-avatar>
        </div>

        <!-- Step Label -->
        <span
          class="tw-text-xs tw-text-center tw-font-medium"
          :class="{
            'tw-text-gray-400': getStepStatus(index + 1) === 'pending',
            'tw-text-primary': getStepStatus(index + 1) === 'active',
            'tw-text-success': getStepStatus(index + 1) === 'completed',
          }"
        >
          {{ step.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stepper-progress {
  width: 100%;
}
</style>

