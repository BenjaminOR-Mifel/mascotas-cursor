import axios from 'axios';
import ModyoProfileClient from './ModyoProfileClient';
import liquidParser from "../../liquid/liquidParser";
import helpers from "@/helpers/index";

const externalApiBase = liquidParser.parse('{{ vars["services-url"] }}');

const apiClient = axios.create({
  baseURL: externalApiBase,
});

const injectToken = async (config) => {
  try {
    const userData = await ModyoProfileClient.get('me');
    const newConfig = config;
    newConfig.headers.authorization = `Bearer ${userData.delegated_token.access_token}`;
    return newConfig;
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

const checkBusinnessException = async (response) => {
  if (response.data.errors) {
    //TODO: (EVOLUTIVO) AGREGAR SLICE PARA QUE NO SE MUESTRE EL CORRELATION ID COMPLETO
    const error = {
      trazabilityCode: response.headers['x-correlation-id'] || response.headers['x-amzn-requestid'] || '',
      translationKey: response.data.errors[0].messageCode,
    }
    throw new Error(JSON.stringify(error));
  }
  return response;
};

// Default error handler for network errors
const checkNetworkErrors = (error) => {
  const errorParsed = {
    trazabilityCode: error?.response?.headers['x-correlation-id'] || error?.response?.headers['x-amzn-requestid'] || '',
    translationKey: error?.response?.status < 500 ?  'default-400': 'default-500',
  }
  throw new Error(JSON.stringify(errorParsed));
};

const stoplighInteceptor = (config) => {
  if(config.baseURL.includes('https://stoplight.io')) {
    const requestConf = sessionStorage.getItem(`qa-${config.url}`)
    if(requestConf) {
      const [code,example] = requestConf.split('/');
      config.headers.Prefer = `code=${code}, example=${example}`;
      return config;
    }
  }
  return config;
}

const injectLanguageHeader = (config) => {
  config.headers['Accept-Language'] = helpers.getCookie('MIFEL_LOCALE') || 'es';
  return config;
};

apiClient.interceptors.request.use(injectLanguageHeader);
apiClient.interceptors.request.use(injectToken);
apiClient.interceptors.request.use(stoplighInteceptor);
apiClient.interceptors.response.use(checkBusinnessException, checkNetworkErrors);

export default apiClient;
