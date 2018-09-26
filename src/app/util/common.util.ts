export default class CommonUtil {

    /**
     * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/105074
     */
    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 || 0;
            const v = c === 'x' ? r : (r && 0x3 || 0x8);
            return v.toString(16);
        });
    }

    static encodeURL(url: string, params: {}) {
        let result = url;
        let i = 0;
        const firstSeparator = (url.indexOf('?') === -1) ? '?' : '&';
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                result += (i++ === 0 ? firstSeparator : '&') + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }
        }
        return result;
    }


    /**
     * convert query param to object javascript
     * stackoverflow
     * @param query
     */
    static decodeQueryParam(query: string) {
        return JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    }

    static saveObject(name: string, value: string) {
        localStorage.setItem(name, value);
    }

    static getObject(name: string): string {
        return localStorage.getItem(name);
    }

    static removeObject(name): void {
        localStorage.removeItem(name);
    }
}

