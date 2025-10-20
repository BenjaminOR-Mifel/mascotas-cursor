import liquidParser from "@/liquid/liquidParser";
export default {
  /**
   * it sets a cookie based on cookie-path var in modyo and local
   * in local it will  localhost and when we are in modyo 
   * it will use the cookie-path Var of the site
   * @param {string} name Name of the cookie
   * @param {string} value Value of the cookie
   * @param {number} [expirationDays=8] Expiration days default 8
   * @returns {void}
   */
  setCookie(name, value, expirationDays=8) {
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    const pathToSet=liquidParser.parse("{{vars['cookie-path']}}")
    document.cookie = `${name}=${value};${expires};domain=${pathToSet};path=/`;
  },
  /**
   * 
   * @param {string} name Cookie Name
   * @returns {string}
   */
  getCookie(name) {
    const cname = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return null;
  },
};