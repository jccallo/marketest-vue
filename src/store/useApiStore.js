import { defineStore } from "pinia";

const useApiStore = defineStore("api", {
  state: () => ({
    errors: {},
    isErrors: false,
    currency: "PEN",
    rate: 1,
  }),
  actions: {
    loadErrors(errors) {
      this.isErrors = true;
      this.errors = errors;
    },
    removeErrors() {
      this.isErrors = false;
      this.errors = {};
    }
  },
});

export default useApiStore;