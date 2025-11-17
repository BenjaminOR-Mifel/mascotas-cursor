import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMascotasStore = defineStore("mascotas", () => {
  // State
  const mascotas = ref([]);
  const currentStep = ref(1);
  const mascotaActual = ref({
    tipo: "",
    nombre: "",
    raza: "",
    edad: null,
    color: "",
    peso: null,
    descripcion: "",
    vacunas: false,
    esterilizado: false,
  });

  // Getters
  const totalMascotas = computed(() => mascotas.value.length);
  const tieneMascotas = computed(() => mascotas.value.length > 0);

  // Actions
  const agregarMascota = (mascota) => {
    const nuevaMascota = {
      id: Date.now(),
      ...mascota,
      fechaRegistro: new Date().toISOString(),
    };
    mascotas.value.push(nuevaMascota);
    resetMascotaActual();
  };

  const actualizarMascota = (id, mascotaActualizada) => {
    const index = mascotas.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      mascotas.value[index] = {
        ...mascotas.value[index],
        ...mascotaActualizada,
        fechaModificacion: new Date().toISOString(),
      };
    }
  };

  const eliminarMascota = (id) => {
    const index = mascotas.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      mascotas.value.splice(index, 1);
    }
  };

  const obtenerMascota = (id) => {
    return mascotas.value.find((m) => m.id === id);
  };

  const setMascotaActual = (mascota) => {
    mascotaActual.value = { ...mascota };
  };

  const resetMascotaActual = () => {
    mascotaActual.value = {
      tipo: "",
      nombre: "",
      raza: "",
      edad: null,
      color: "",
      peso: null,
      descripcion: "",
      vacunas: false,
      esterilizado: false,
    };
  };

  const nextStep = () => {
    if (currentStep.value < 4) {
      currentStep.value++;
    }
  };

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  };

  const setStep = (step) => {
    if (step >= 1 && step <= 4) {
      currentStep.value = step;
    }
  };

  const resetStore = () => {
    mascotas.value = [];
    currentStep.value = 1;
    resetMascotaActual();
  };

  return {
    // State
    mascotas,
    currentStep,
    mascotaActual,

    // Getters
    totalMascotas,
    tieneMascotas,

    // Actions
    agregarMascota,
    actualizarMascota,
    eliminarMascota,
    obtenerMascota,
    setMascotaActual,
    resetMascotaActual,
    nextStep,
    prevStep,
    setStep,
    resetStore,
  };
});

