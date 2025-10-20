import translationClient from './clients/ModyoTranslationsClient';

const space = 'configuracion-pf';
const type = 'mifel-widgets-accounts-checks';

//Errors content
const errorSpace = 'errores';
const errorType = 'mensaje-de-error';
const PER_PAGE = 100;

export default {
  async getTranslations(lang) {
    const SDKRequest = await translationClient(lang).getContentType(space, type).getEntries();
    return { [lang]: SDKRequest.entries[0].fields };
  },
  async getErrorsTranslation(lang) {
    const SDKrequest = translationClient(lang).getContentType(errorSpace, errorType);
    const filters = SDKrequest.Filter().Pagination(1, PER_PAGE);
    const contentErrors = await SDKrequest.getEntries(filters);
    if (contentErrors.entries.length === 0) {
      return { [lang] : [] };
    }
    const errorMsg = contentErrors.entries.reduce((acc, entry) => {
      acc[entry.meta.slug] = entry.fields.Detalle;
      return acc;
    }, {});
    return { [lang] : errorMsg };
  }
};
