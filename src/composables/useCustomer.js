import { ref } from "vue";
import customerService from "../services/customerService";
import { Customer } from "../interfaces/customer";

const useCustomer = () => {
  const customers = ref([]);
  const customer = ref({ ...Customer });

  const getCustomers = async () => {
    await customerService.index().then((response) => {
      customers.value = response.data.data;
    });
  };

  const getCustomer = async (id) => {
    await customerService.show(id).then((response) => {
      customer.value = response.data.data;
    });
  };

  const storeCustomer = async (data) => {
    await customerService.store(data).then(() => {
      alert("Nota creado correctamente.");
    });
  };

  const updateCustomer = async (data, id) => {
    await customerService.update(data, id).then(() => {
      alert("Nota editado correctamente.");
    });
  };

  const destroyCustomer = async (id) => {
    if (confirm('¿Esta seguro de eliminar?') == true) {
      await customerService.destroy(id).then(() => {
        alert("Nota Eliminado correctamente.");
      });
    }
  };

  return {
    customers,
    customer,
    getCustomers,
    getCustomer,
    storeCustomer,
    updateCustomer,
    destroyCustomer,
  };
};

export default useCustomer;