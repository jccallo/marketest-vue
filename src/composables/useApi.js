import { storeToRefs } from "pinia";
import useApiStore from "../store/useApiStore";

const useApi = () => {
  const apiStore = useApiStore();
  const { errors, isErrors, currency, rate } = storeToRefs(apiStore);

  const loadErrors = (errors) => {
    apiStore.loadErrors(errors);
  };

  const removeErrors = () => {
    apiStore.removeErrors();
  };

  const errorHandler = (error) => {
    if (error.code === "ERR_NETWORK") { // URL equivocada
      console.log("ERR_NETWORK:", error.code);
      // location.replace("/error");
    }
    if (error.code === "ERR_BAD_RESPONSE") { // mysql apagada
      console.log("ERR_BAD_RESPONSE:", error.code);
      // location.replace("/error");
    }
    if (error.code == "ERR_BAD_REQUEST") { // error capturado en la api
      console.log("ERR_BAD_REQUEST:", error.code);
      if (error.response.data.errors == "No autenticado.") {
        location.replace("/login");
      }
      loadErrors(error.response.data.errors);
    }
  };

  return {
    isErrors,
    errors,
    loadErrors,
    removeErrors,
    errorHandler,
    currency,
    rate,
  };
};

export default useApi;