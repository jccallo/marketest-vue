import axios from "axios";
import useApi from "../composables/useApi";

// instancia de axios
const apiService = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// mandamos el token
apiService.interceptors.request.use(
  (config) => {
    // persistencia de token
    let token = localStorage.getItem("token");
    if (token) {
      config.headers = { 
        'Authorization': `Bearer ${token}`,
      }
    }

    const { removeErrors } = useApi();
    removeErrors();
    return config;
  },
  (error) => {
    const { errorHandler } = useApi();
    errorHandler(error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    const { removeErrors } = useApi();
    removeErrors();
    return response;
  },
  (error) => {
    const { errorHandler } = useApi();
    errorHandler(error);
    return Promise.reject(error);
  }
);

export default apiService;