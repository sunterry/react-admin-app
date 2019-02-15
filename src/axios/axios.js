import axios from 'axios';
import { getLocal } from '@/utils/local/local.native';
import { TOKEN } from '@/utils//local/local.types';
import { baseURL, timeout } from './config';
import setAuthorizationToken from './auth';

class HttpRequest {
  constructor(baseUrl = baseURL, timeOut = timeout) {
    this.baseUrl = baseURL;
    this.timeOut = timeOut;
    this.queue = {};
  };

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      responsesType: 'json',
      timeout: this.timeOut,
    };
    return config;
  };

  request(options) {
    const instance = axios.create();
    const opts = Object.assign({}, this.getInsideConfig(), options);
    setAuthorizationToken(instance, getLocal(TOKEN));
    this.interceptors(instance, opts.url);
    return instance(opts);
  };

  distroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {}
  }

  interceptors(instance, url) {
    instance.interceptors.request.use((config) => {
      if (!Object.keys(this.queue).length) {
        // Spin.show();
      } else {
        this.queue[url] = true;
      }
      return config;
    }, error => Promise.reject(error));
    instance.interceptors.response.use((response) => {
      this.distroy(url);
      const { code, message, ...obj } = response.data;
      if (response.status === 200 && (code && code === 1000)) {
        return Object.assign({}, { ...obj }, { message });
      }
      return Object.assign({}, { code, message });
    }, (error) => {
      this.distroy(url);
      return Promise.reject(error);
    });
  }
}

export default HttpRequest
