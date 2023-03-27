<script setup>
import { onMounted, ref, computed } from "vue";
import ErrorMessage from "../../components/shared/ErrorMessage.vue";
import Navbar from "../../components/shared/Navbar.vue";
import useNote from "../../composables/useNote";
import useApi from "../../composables/useApi";
import useCustomer from "../../composables/useCustomer";
import useItem from "../../composables/useItem";
import useConverter from "../../composables/useConverter";

const { errors, isErrors } = useApi();
const { storeNote } = useNote();
const { getItems, items } = useItem();
const { getCustomers, customers } = useCustomer();
const { currency, convert } = useConverter();

// states
const itemsSelected = ref([]);
const itemQuantity = ref(1);
const totalFinal = ref(0);
const producto = ref("");
const customer = ref("");
const data = ref([]);

// computed
const totalFinalConverted = computed(() => {
  return convert(totalFinal.value);
})

// eliminar el item de la lista
const deleteItemSelected = (id) => {
  const itemSelectedPosition = itemsSelected.value.findIndex(el => el.id == id);
  if (itemSelectedPosition == -1) return;
  itemsSelected.value.splice(itemSelectedPosition, 1);
  itemQuantity.value = 1;
  producto.value = "";
  //total final de la lista
  totalFinal.value = parseFloat(getTotalFinal().toFixed(2));

  console.log(itemsSelected.value)
};

// borrar todos los items de la lista
const deleteAllItemsSelected = () => {
  itemsSelected.value = [];
  totalFinal.value = 0;
  itemQuantity.value = 1;
  producto.value = "";
  //total final de la lista
  totalFinal.value = parseFloat(getTotalFinal().toFixed(2));

  console.log(itemsSelected.value)
};

// suma los totales de items de la lista
const getTotalFinal = () => {
  let suma = itemsSelected.value.reduce((total, elemento) => {
    if (!isNaN(elemento.total)) {
      return total + elemento.total;
    } else {
      return total;
    }
  }, 0);
  return suma;
};

// forma la data a enviar
const createData = () =>{
  data.value = {
    "customer_id": customer.value,
    "total": totalFinal.value,
    "items": itemsSelected.value,
  }
  console.log(data.value)
}

// evento al seleccionar un item para la lista
const ItemSelectChange = (event) => {
  const id = event.target.value;
  const itemSelectedId = itemsSelected.value.find(el => el.id == id)
  const quantity = itemQuantity.value;

  // validamos los campos
  if (quantity == 0) {
    alert('Cantidad del producto debe ser mayor a cero.')
    producto.value = "";
    return;
  }

  if (id == "") {
    alert('Debe escoger un producto.')
    return;
  }

  if (itemSelectedId) {
    alert('Producto ya agregado. Por favor, borrelo primero y agregalo nuevamente.')
    producto.value = "";
    return;
  }

  // calculamos las propiedades del item
  const name = items.value.find(el => el.id == id).name;
  const price = parseFloat(items.value.find(el => el.id == id).price);
  const total = price * quantity;

  // reseteamos los campos 
  itemQuantity.value = 1;
  producto.value = "";

  // agregamos a la lista
  itemsSelected.value.push({
    id: event.target.value,
    name: name,
    price: price,
    quantity: quantity,
    total: total,
  });
  
  // total final de la lista
  totalFinal.value = parseFloat(getTotalFinal().toFixed(2));

  console.log(itemsSelected.value)
};

// guardar nota
const saveNote = async () => {
  if (customer.value == "") {
    alert("Debe elegir un cliente.");
    return;
  }
  createData()
  await storeNote(data.value);
};

// al montar el evento
onMounted(async () => {
  await getCustomers();
  await getItems();
});
</script>

<template>
  <Navbar></Navbar>

  <!-- titulo -->
  <div class="container">
    <div class="row align-items-center mb-2">
      <div class="col-6">
        <div class="h3">Nota <small class="text-muted" style="font-size: 16px; font-weight: 500;">Crear</small></div>
      </div>
      <div class="col-6">
        <div class="form-row form-inline justify-content-end">
          <div class="col-auto my-1">
            <router-link class="btn btn-link" :to="{ name: 'note-index' }">Volver</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="container">
    <div class="row">

      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-header">Cabecera</div>
          <div class="card-body">
            <form autocomplete="off" @submit.prevent="saveNote">
              <div class="form-group">
                <label for="customers">Cliente:</label>
                <select class="custom-select" id="customers" v-model="customer">
                  <option value="">Seleccionar</option>
                  <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                    {{ customer.name }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-info w-100">Guardar</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-8 mb-4">
        <div class="card">
          <div class="card-header">Detalles</div>
          <div class="card-body">
            <!-- alert -->
            <ErrorMessage :is-errors="isErrors" :errors="errors" />
            <div class="form-row mb-4">
              <div class="col-8">
                <label for="items">Producto:</label>
                <select class="custom-select" id="items" @change="ItemSelectChange" v-model="producto">
                  <option value="">Seleccionar</option>
                  <option v-for="item in items" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col-4">
                <label for="quantity">Cantidad:</label>
                <input type="number" class="form-control" min="0" id="quantity" v-model="itemQuantity">
              </div>
            </div>

            <div class="row">
              <div class="col">
                <table class="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th scope="col" style="border-top: 0;">Producto</th>
                      <th scope="col" style="border-top: 0;">Precio ({{ currency }})</th>
                      <th scope="col" style="border-top: 0;">Cantidad</th>
                      <th scope="col" style="border-top: 0;">Total ({{ currency }})</th>
                      <th scope="col" style="border-top: 0;" class="text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in itemsSelected" :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>{{ convert(item.price) }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ convert(item.total) }}</td>
                      <td class="text-right">
                        <a class="btn btn-danger btn-sm" @click.stop="deleteItemSelected(item.id)">Eliminar</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="form-row form-inline justify-content-between">
                  <div class="col-auto my-1">
                    <label>
                      <span class="font-weight-bold">Total Final ({{ currency }}):</span> <span class="ml-2">{{ totalFinalConverted }}</span>
                    </label>
                  </div>
                  <div class="col-auto my-1">
                    <button class="btn btn-danger btn-sm" @click="deleteAllItemsSelected">Vaciar Todo</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>