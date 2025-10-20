export default {
    methods: {
      /**
       * Get Param From URL
       * @param {string} param Param from url to get
       * @returns {string}
       */
      getUrlParam(param) { // leer siempre el parametro de la url "d" para obtener el base64
        const params = new URLSearchParams(window.location.search);
        return params.get(param) || null;
      },
      /**
       * Decode param in base64 and uri encoded 
       * @param {string} data Data encoded and in base64
       * @returns {object}
       */
      base64URIDecoder(data) {
        return JSON.parse(window.atob(decodeURIComponent(data)))
      },
      /**
       * Encode base64
       * @param {object} data Data to encode
       * @returns {string}
       */
      base64URIEncoder(data) {
        return encodeURIComponent(window.btoa(JSON.stringify(data)))
      },
    },
};