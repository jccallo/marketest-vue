<script setup>
import { onMounted, ref } from "vue";
import ErrorMessage from "../../components/shared/ErrorMessage.vue";
import useAuth from "../../composables/useAuth";
import useApi from "../../composables/useApi";

const { storeSession } = useAuth();
const { errors, isErrors } = useApi();
const loginData = ref({});

// methods
const login = async () => {
  await storeSession(loginData.value);
};
</script>


<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class=" col-xl-4 col-lg-5 col-md-6 col-sm-8 col-9 card mx-auto">
          <div class="card-body py-5 px-4">
            <h4 class="card-title text-center mb-4">Iniciar Sesion</h4>
            <ErrorMessage :is-errors="isErrors" :errors="errors" />
            <form @submit.prevent="login">
              <div class="form-group">
                <input type="email" class="form-control" placeholder="Correo" v-model="loginData.email">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Contraseña" v-model="loginData.password">
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-success btn-block btn-lg">Ingresar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  background-image: url("img/login-bg.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>