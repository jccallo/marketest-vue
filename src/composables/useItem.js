import { ref } from "vue";
import itemService from "../services/itemService";
import { Item } from "../interfaces/item";

const useItem = () => {
  const items = ref([]);
  const item = ref({ ...Item });

  const getItems = async () => {
    await itemService.index().then((response) => {
      items.value = response.data.data;
    });
  };

  const getItem = async (id) => {
    await itemService.show(id).then((response) => {
      item.value = response.data.data;
    });
  };

  const storeItem = async (data) => {
    await itemService.store(data).then(() => {
      alert("Nota creado correctamente.");
    });
  };

  const updateItem = async (data, id) => {
    await itemService.update(data, id).then(() => {
      alert("Nota editado correctamente.");
    });
  };

  const destroyItem = async (id) => {
    if (confirm('¿Esta seguro de eliminar?') == true) {
      await itemService.destroy(id).then(() => {
        alert("Nota Eliminado correctamente.");
      });
    }
  };

  return {
    items,
    item,
    getItems,
    getItem,
    storeItem,
    updateItem,
    destroyItem,
  };
};

export default useItem;