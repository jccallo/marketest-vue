import apiService from "./apiService";

const noteService = {
  index() {
    return apiService.get("/notes");
  },
  show(id) {
    return apiService.get(`/notes/${id}`);
  },
  store(data) {
    return apiService.post("/notes", data);
  },
  update(data, id) {
    return apiService.put(`/notes/${id}`, data);
  },
  destroy(id) {
    return apiService.delete(`/notes/${id}`);
  },
};

export default noteService;