import axios from 'axios';

let baseUrl = '';

class Http {
  static parseUrl(url) {
    return `${baseUrl}/${url}`;
  }

  static get(url, data = null, config = {}) {
    if (data !== null) {
      config['params'] = data;
    }

    return axios.get(this.parseUrl(url), config).catch(error => {
      return Promise.reject(error.response);
    });
  }

  static post(url, data, config = null) {
    return axios.post(this.parseUrl(url), data, config).catch(error => {
      return Promise.reject(error.response);
    });
  }
  //update, delete는 백엔드 프래임워크에 따라 다르게

  static update(url, data = {}, config = null) {
    data['_method'] = 'put';

    return axios.post(this.parseUrl(url), data, config).catch(error => {
      return Promise.reject(error.response);
    });
  }

  static destroy(url, data = {}, config = null) {
    data['_method'] = 'delete';

    return axios.post(this.parseUrl(url), data, config).catch(error => {
      return Promise.reject(error.response);
    });
  }
}

export default Http;
