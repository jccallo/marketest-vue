<script setup>
import { onMounted, ref } from "vue";
import useAuth from "../../composables/useAuth";
import useConverter from "../../composables/useConverter";

const { destroySession, getUserSession } = useAuth();
const { getRate, rate, currency } = useConverter();

const userName = ref("");

const logout = async () => {
  await destroySession();
};

const currencyChanged = async (event) => {
  const currency = event.target.value;
  await getRate(currency);
  console.log(currency, rate.value)
}

// onMounted
onMounted(async () => {
  userName.value = getUserSession().name;
});
</script>

<template>
  <!-- cabecera -->
  <div class="container-fluid bg-primary">
    <div class="container">

      <!-- navbar -->
      <nav class="navbar navbar-expand-sm navbar-dark bg-primary py-3 px-0"><!--style="background-color: #242939;"-->

        <!-- Brand -->
        <a class="navbar-brand" href="index.html">
          <b>MARKETEST</b>
        </a>

        <!-- Toggler/collapsibe Button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-light mr-3" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="bi bi-person-fill"></i> {{ userName }}
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" style="cursor: pointer;">Mi perfil</a>
                <a class="dropdown-item" style="cursor: pointer;">Suscripciones</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" style="cursor: pointer;" @click.stop="logout">Cerrar sesión</a>
              </div>
            </li>
            <li class="nav-item d-flex align-items-center">
              <select name="customer" class="custom-select custom-select-sm mb-0 bg-primary text-light align-text-bottom" id="customer" v-model="currency" @change="currencyChanged">
                <option value="PEN" selected class=" bg-white text-light text-dark">PEN</option>
                <option value="USD" class=" bg-white text-light text-dark">USD</option>
                <option value="EUR" class=" bg-white text-light text-dark">EUR</option>
              </select>
            </li>
          </ul>
        </div>

      </nav>

    </div>

  </div>

  <!-- another navbar -->
  <div class="container-fluid mb-4" style="background-color: #FFFFFF;">
    <div class="container">
      <ul class="nav nav-tabs pt-2">
        <li class="nav-item">
          <router-link :to="{ name: 'home-index' }" class="nav-link" href="#">Inicio</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'note-index' }" class="nav-link" href="#">Notas</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Clientes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Items</a>
        </li>
      </ul>
    </div>
  </div>
</template>