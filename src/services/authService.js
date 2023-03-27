import apiService from "./apiService";

const authService = {
  store(data) {
    return apiService.post("/login", data);
  },
  destroy() {
    return apiService.post(`/logout`);
  },
};

export default authService;