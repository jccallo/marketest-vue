import apiService from "./apiService";

const itemService = {
  index() {
    return apiService.get("/items");
  },
  show(id) {
    return apiService.get(`/items/${id}`);
  },
  store(data) {
    return apiService.post("/items", data);
  },
  update(data, id) {
    return apiService.put(`/items/${id}`, data);
  },
  destroy(id) {
    return apiService.delete(`/items/${id}`);
  },
};

export default itemService;