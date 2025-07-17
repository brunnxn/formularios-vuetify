<script>
import { ref } from 'vue';

export default {
  name: 'Login',

  setup() {
    const form = ref();
    const loading = ref(false);
    const email = ref('');
    const password = ref('');
    const isLogin = ref(true); // alternar entre login e criação de conta

    const required = [(v) => !!v || 'Campo obrigatório'];

    const onSubmit = () => {
      if (!form.value) return;

      form.value.validate().then((isValid) => {
        if (!isValid) return;

        loading.value = true;

        setTimeout(() => {
          // Recupera usuários do sessionStorage
          const users = JSON.parse(sessionStorage.getItem('users') || '{}');

          if (isLogin.value) {
            // LOGIN
            if (users[email.value] && users[email.value] === password.value) {
              alert('Login bem-sucedido!'); //substiruir aqui!!!!
            } else {
              alert('Email ou senha inválidos');
            }
          } else {
            // CRIAR CONTA
            if (users[email.value]) {
              alert('Email já cadastrado');
              loading.value = false;
              return;
            }

            users[email.value] = password.value;
            sessionStorage.setItem('users', JSON.stringify(users));
            alert('Conta criada com sucesso!');
            isLogin.value = true; // volta para modo login
          }

          loading.value = false;
        }, 800); // simula um pequeno delay
      });
    };

    return {
      form,
      loading,
      email,
      password,
      required,
      onSubmit,
      isLogin,
    };
  },
};
</script>

<template>
  <v-sheet rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
        ref="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="required"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="required"
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          clearable
        ></v-text-field>

        <br>

        <v-btn
          :disabled="loading"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          {{ isLogin ? 'Entrar' : 'Criar Conta' }}
        </v-btn>

        <v-btn
          variant="text"
          block
          @click="isLogin = !isLogin"
          class="mt-2"
        >
          {{ isLogin ? 'Ainda não tem conta? Criar conta' : 'Já tem conta? Entrar' }}
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style scoped>
/* Estilo opcional */
</style>
