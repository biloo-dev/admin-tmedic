import { initializeAxios } from '~/util/api' 
 
const accessor = ({ $axios } : { $axios: any }) => {
  $axios.baseURL = "http://192.168.1.34:3333/api/"
  initializeAxios($axios)
}

export default accessor