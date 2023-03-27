import { useRouter } from "vue-router";
import authService from "../services/authService";

const useAuth = () => {
  const router = useRouter();

  const getUserSession = () => {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  };

  const storeSession = async (data) => {
    await authService.store(data).then((response) => {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      location.replace("/home");
    });
  };

  const destroySession = async () => {
    if (confirm("¿Esta seguro de salir?") == true) {
      await authService.destroy().then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push({ name: "login" });
      });
    }
  };

  return {
    getUserSession,
    storeSession,
    destroySession,
  };
};

export default useAuth;