import { NuxtAxiosInstance } from "@nuxtjs/axios";

let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  // axiosInstance.setBaseURL('http://161.35.124.15/api/')
  axiosInstance.setBaseURL("http://127.0.0.1:3333/api/");
  // baseURL: 'http://127.0.0.1:3333/api/', // Used as fallback if no runtime config is provided
  // baseURL: 'http://161.35.124.15/api/', // Used as fallback if no runtime config is provided
  $axios = axiosInstance;
}

export { $axios };
 