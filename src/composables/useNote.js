import { ref } from "vue";
import noteService from "../services/noteService";
import { Note } from "../interfaces/note";

const useNote = () => {
  const notes = ref([]);
  const note = ref({ ...Note });

  const getNotes = async () => {
    await noteService.index().then((response) => {
      notes.value = response.data.data;
    });
  };

  const getNote = async (id) => {
    await noteService.show(id).then((response) => {
      note.value = response.data.data;
    });
  };

  const storeNote = async (data) => {
    await noteService.store(data).then((response) => {
      console.log(response);
      alert("Nota creado correctamente.");
    });
  };

  const updateNote = async (data, id) => {
    await noteService.update(data, id).then((response) => {
      console.log(response);
      alert("Nota editado correctamente.");
    });
  };

  const destroyNote = async (id) => {
    if (confirm('¿Esta seguro de eliminar?') == true) {
      await noteService.destroy(id).then(() => {
        alert("Nota Eliminado correctamente.");
      });
    }
  };

  return {
    notes,
    note,
    getNotes,
    getNote,
    storeNote,
    updateNote,
    destroyNote,
  };
};

export default useNote;