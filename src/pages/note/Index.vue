<script setup>
import { onMounted } from "vue";
import useNote from "../../composables/useNote";
import useConverter from "../../composables/useConverter";
import Navbar from "../../components/shared/Navbar.vue";

const { getNotes, notes } = useNote();
const { currency, convert } = useConverter();

onMounted(async () => {
  await getNotes();
});
</script>

<template>
  <Navbar></Navbar>

  <!-- titulo -->
  <div class="container">
    <div class="row align-items-center mb-2">
      <div class="col-6">
        <div class="h3">Notas <small class="text-muted" style="font-size: 16px; font-weight: 500;">Mostrando {{ notes.length }}
            resultados en Total</small></div>
      </div>
      <div class="col-6">
        <div class="form-row form-inline justify-content-end">
          <div class="col-auto my-1">
            <router-link class="btn btn-info" :to="{ name: 'note-create' }">+ Agregar Nuevo</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- large table -->
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card mb-4">

          <!-- card body -->
          <div class="card-body table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col" style="border-top: 0;">#</th>
                  <th scope="col" style="border-top: 0;">Cliente</th>
                  <th scope="col" style="border-top: 0;">Fecha</th>
                  <th scope="col" style="border-top: 0;">Total ({{ currency }})</th>
                  <th scope="col" style="border-top: 0;" class="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="note in notes" :key="note.id">
                  <th>{{ note.id }}</th>
                  <td>{{ note.customer }}</td>
                  <td>{{ note.date }}</td>
                  <td>{{ convert(note.total) }}</td>
                  <td class="text-right">
                    <router-link class="btn btn-info btn-sm mr-1" :to="{
                      name: 'note-edit',
                      params: { id: note.id },
                    }">Editar
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>