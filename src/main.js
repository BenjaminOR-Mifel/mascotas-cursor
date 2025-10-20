import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import { MifelToast, formatNumber } from '@modyo-connect/mifel-mx-widgets-commons';
import { createPinia, PiniaVuePlugin } from 'pinia'
import {
  i18n,
  loadLanguageAsync
} from './i18n';
import './vee-validate-config';
import "./scss/custom.scss";
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import "@/scss/tailwind.scss";
import { vMaska } from "maska"

const pinia = createPinia();

Vue.use(Vuetify);
Vue.use(PiniaVuePlugin);
Vue.use(MifelToast);
Vue.use(pinia);

const VueAxe = process.env.NODE_ENV !== 'production' ? require('vue-axe').default : null;

Vue.filter('currency', function (value) {
  return `$${formatNumber(value)}`;
})
Vue.filter('hideAccount', function (value) {
  const lastFourDigits = `${value.slice(-4)}`;
  return lastFourDigits.padStart(8, "*");
})

Vue.directive("maska", vMaska)

Vue.config.productionTip = false
if (VueAxe) {
  Vue.use(VueAxe, {
    allowConsoleClears: false,
  });
}

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

new Vue({
  created: async () => {
    await loadLanguageAsync();
  },
  render: h => h(App),
  pinia,
  vuetify: new Vuetify(),
  router,
  i18n,
}).$mount('#mifel-mx-widgets-pb-pf-onboarding-mascotas')

