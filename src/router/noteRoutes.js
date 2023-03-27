import NoteIndex from '../pages/note/Index.vue';
import NoteEdit from '../pages/note/Edit.vue';
import NoteCreate from '../pages/note/Create.vue';

const routes = [
  {
    path: "/notes",
    name: "note-index",
    component: NoteIndex,
    meta: { requiresAuth: true }
  },
  {
    path: "/notes/create",
    name: "note-create",
    component: NoteCreate,
    meta: { requiresAuth: true }
  },
  {
    path: "/notes/:id/edit",
    name: "note-edit",
    component: NoteEdit,
    props: true,
    meta: { requiresAuth: true }
  },
];

export default routes;