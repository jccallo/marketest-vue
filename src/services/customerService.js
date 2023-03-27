import apiService from "./apiService";

const customerService = {
  index() {
    return apiService.get("/customers");
  },
  show(id) {
    return apiService.get(`/customers/${id}`);
  },
  store(data) {
    return apiService.post("/customers", data);
  },
  update(data, id) {
    return apiService.put(`/customers/${id}`, data);
  },
  destroy(id) {
    return apiService.delete(`/customers/${id}`);
  },
};

export default customerService;