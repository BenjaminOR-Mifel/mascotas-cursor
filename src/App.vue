<script>
import { localize } from "vee-validate";

export default {
  mounted() {
    localize(this.$i18n.locale);
    window.addEventListener("changedLanguage", (event) => {
      this.$i18n.locale = event.detail.language;
      localize(event.detail.language);
    });
  },
};
</script>

<template>
  <v-app>
    <div class="tw-flex tw-justify-center tw-items-center">
      <div class="tw-w-full tw-max-w-lg">
        <v-container fluid>
          <router-view :key="$route.path" />
        </v-container>
      </div>
    </div>
  </v-app>
</template>
