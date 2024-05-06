import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  timeout: 5000,
});

const retryCount = 3;

instance.interceptors.response.use(undefined, async function axiosRetryInterceptor(error) {
  const config = error.config;

  if (!config || !config.retryCount) return Promise.reject(error);

  config.retryCount -= 1;

  const delay = Math.pow(2, retryCount - config.retryCount) * 1000;

  await new Promise((res) => setTimeout(res, delay));

  return instance(config);
});

export default instance;
