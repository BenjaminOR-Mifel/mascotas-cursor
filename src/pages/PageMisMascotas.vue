<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router/composables";
import { useMascotasStore } from "@/stores/mascotas";
import PetCard from "@/components/PetCard.vue";

const router = useRouter();
const mascotasStore = useMascotasStore();

const searchQuery = ref("");
const filterTipo = ref("todos");
const dialogDelete = ref(false);
const mascotaToDelete = ref(null);

const tiposMascota = ref([
  { text: "Todos", value: "todos" },
  { text: "Perro", value: "perro" },
  { text: "Gato", value: "gato" },
  { text: "Ave", value: "ave" },
  { text: "Conejo", value: "conejo" },
  { text: "Otro", value: "otro" },
]);

const mascotasFiltradas = computed(() => {
  let mascotas = mascotasStore.mascotas;

  // Filtrar por tipo
  if (filterTipo.value !== "todos") {
    mascotas = mascotas.filter(
      (m) => m.tipo?.toLowerCase() === filterTipo.value.toLowerCase()
    );
  }

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    mascotas = mascotas.filter(
      (m) =>
        m.nombre?.toLowerCase().includes(query) ||
        m.raza?.toLowerCase().includes(query) ||
        m.tipo?.toLowerCase().includes(query)
    );
  }

  return mascotas;
});

const handleEdit = (mascota) => {
  mascotasStore.setMascotaActual(mascota);
  router.push({ name: "paso-2" });
};

const handleDelete = (mascota) => {
  mascotaToDelete.value = mascota;
  dialogDelete.value = true;
};

const confirmDelete = () => {
  if (mascotaToDelete.value) {
    mascotasStore.eliminarMascota(mascotaToDelete.value.id);
    dialogDelete.value = false;
    mascotaToDelete.value = null;
  }
};

const registrarNueva = () => {
  mascotasStore.resetMascotaActual();
  mascotasStore.setStep(1);
  router.push({ name: "paso-1" });
};
</script>

<template>
  <div class="tw-space-y-6">
    <!-- Header -->
    <v-card elevation="4">
      <v-card-title class="tw-bg-primary tw-text-white">
        <v-icon left color="white">mdi-paw</v-icon>
        Mis Mascotas
        <v-spacer />
        <v-chip color="white" text-color="primary">
          {{ mascotasStore.totalMascotas }}
          {{ mascotasStore.totalMascotas === 1 ? "mascota" : "mascotas" }}
        </v-chip>
      </v-card-title>

      <v-card-text class="tw-p-6">
        <!-- Search and Filter -->
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="searchQuery"
              label="Buscar mascota"
              outlined
              dense
              prepend-inner-icon="mdi-magnify"
              clearable
              placeholder="Buscar por nombre, raza o tipo..."
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              v-model="filterTipo"
              :items="tiposMascota"
              label="Filtrar por tipo"
              outlined
              dense
              prepend-inner-icon="mdi-filter"
            />
          </v-col>
        </v-row>

        <!-- Add New Button -->
        <div class="tw-flex tw-justify-end tw-mb-4">
          <v-btn color="primary" @click="registrarNueva">
            <v-icon left>mdi-plus</v-icon>
            Registrar Nueva Mascota
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Mascotas List -->
    <div v-if="mascotasFiltradas.length > 0" class="tw-space-y-4">
      <pet-card
        v-for="mascota in mascotasFiltradas"
        :key="mascota.id"
        :pet="mascota"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <!-- Empty State -->
    <v-card v-else elevation="2">
      <v-card-text class="tw-text-center tw-py-12">
        <v-icon size="100" color="grey lighten-1">
          {{ searchQuery || filterTipo !== "todos" ? "mdi-magnify" : "mdi-paw-off" }}
        </v-icon>
        <h3 class="tw-text-xl tw-font-bold tw-mt-4 tw-mb-2">
          {{
            searchQuery || filterTipo !== "todos"
              ? "No se encontraron mascotas"
              : "No tienes mascotas registradas"
          }}
        </h3>
        <p class="tw-text-gray-600 tw-mb-6">
          {{
            searchQuery || filterTipo !== "todos"
              ? "Intenta con otros términos de búsqueda"
              : "Comienza registrando tu primera mascota"
          }}
        </p>
        <v-btn
          v-if="!searchQuery && filterTipo === 'todos'"
          color="primary"
          large
          @click="registrarNueva"
        >
          <v-icon left>mdi-plus</v-icon>
          Registrar Mi Primera Mascota
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="dialogDelete" max-width="500">
      <v-card>
        <v-card-title class="tw-text-lg tw-font-bold">
          <v-icon left color="error">mdi-alert</v-icon>
          Confirmar Eliminación
        </v-card-title>

        <v-card-text class="tw-py-4">
          <p class="tw-mb-4">
            ¿Estás seguro de que deseas eliminar a
            <strong>{{ mascotaToDelete?.nombre }}</strong> del registro?
          </p>
          <v-alert type="warning" dense text border="left">
            Esta acción no se puede deshacer.
          </v-alert>
        </v-card-text>

        <v-card-actions class="tw-p-4">
          <v-spacer />
          <v-btn text @click="dialogDelete = false">
            Cancelar
          </v-btn>
          <v-btn color="error" @click="confirmDelete">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

