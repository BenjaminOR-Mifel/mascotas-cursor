export default {
  watch: {
    '$i18n.locale': {
      handler(newVal, oldVal) {
        if(newVal === oldVal) {return} this.translate(newVal);
      },
      immediate: true
    }
  },
};