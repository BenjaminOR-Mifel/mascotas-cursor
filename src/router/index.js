import PagePaso1 from "@/pages/PagePaso1.vue";
import PagePaso2 from "@/pages/PagePaso2.vue";
import PagePaso3 from "@/pages/PagePaso3.vue";
import PagePaso4 from "@/pages/PagePaso4.vue";
import PageExito from "@/pages/PageExito.vue";
import PageMisMascotas from "@/pages/PageMisMascotas.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "paso-1",
    component: PagePaso1,
    meta: {
      title: "Bienvenida - Registro de Mascotas",
      step: 1,
    },
  },
  {
    path: "/paso-2",
    name: "paso-2",
    component: PagePaso2,
    meta: {
      title: "Datos de la Mascota",
      step: 2,
    },
  },
  {
    path: "/paso-3",
    name: "paso-3",
    component: PagePaso3,
    meta: {
      title: "Información Adicional",
      step: 3,
    },
  },
  {
    path: "/paso-4",
    name: "paso-4",
    component: PagePaso4,
    meta: {
      title: "Confirmación",
      step: 4,
    },
  },
  {
    path: "/exito",
    name: "exito",
    component: PageExito,
    meta: {
      title: "Registro Exitoso",
    },
  },
  {
    path: "/mis-mascotas",
    name: "mis-mascotas",
    component: PageMisMascotas,
    meta: {
      title: "Mis Mascotas",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// Navigation guard para actualizar el título de la página
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + " | Mifel";
  }
  next();
});

export default router;
