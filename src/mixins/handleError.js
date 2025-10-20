export default {
  methods: {
    handleError(error) {
      const errorParsed = JSON.parse(error.message);
      const errorExist = this.$te('errors.' + errorParsed.translationKey) || errorParsed.translationKey.includes('default');    
      const message =errorExist? `${ this.$t('errors.'+ errorParsed.translationKey, { trazabilityCode: errorParsed.trazabilityCode }) }`:
       `${this.$t('errors.default', { trazabilityCode: errorParsed.trazabilityCode, errorSlug: errorParsed.translationKey }) }`;

      if (this['error-' + errorParsed.translationKey]) {
        this['error-' + errorParsed.translationKey](errorParsed);
      } else {
        this.$mifelToast.show({
          description: message,
          type: 'error',
          containerId: 'toast',
          alwaysVisible: true,
        });
      }
    },
  },
}