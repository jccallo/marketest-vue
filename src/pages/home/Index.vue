<script setup>
import { onMounted } from "vue";
import Navbar from "../../components/shared/Navbar.vue";
import useAuth from "../../composables/useAuth";

const { getSession } = useAuth();

// onMounted
// onMounted(async () => {
//   await getSession();
// });
</script>

<template>
  <Navbar></Navbar>
  <div class="container">
    <div class="jumbotron">
      <div class="container text-center">
        <h1 class="display-4">Bienvenido a Marketest</h1>
        <p class="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, possimus debitis..</p>
      </div>
    </div>
  </div>
  
</template>