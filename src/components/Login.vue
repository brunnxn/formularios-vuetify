<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-h6">
            {{ isLogin ? 'Login' : 'Criar Conta' }}
          </v-card-title>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="email"
                label="Email"
                :rules="required"
                prepend-icon="mdi-email"
              />
              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                :rules="required"
                prepend-icon="mdi-lock"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn :loading="loading" color="primary" block @click="onSubmit">
              {{ isLogin ? 'Entrar' : 'Criar Conta' }}
            </v-btn>
          </v-card-actions>

          <v-card-subtitle class="text-center">
            <v-btn text @click="isLogin = !isLogin">
              {{ isLogin ? 'Criar nova conta' : 'Já tem conta? Entrar' }}
            </v-btn>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',

  setup() {
    const form = ref();
    const loading = ref(false);
    const email = ref('');
    const password = ref('');
    const isLogin = ref(true);
    const router = useRouter();

    const required = [(v) => !!v || 'Campo obrigatório'];

    const onSubmit = () => {
      if (!form.value) return;

      form.value.validate().then((isValid) => {
        if (!isValid) return;

        loading.value = true;

        setTimeout(() => {
          const users = JSON.parse(sessionStorage.getItem('users') || '{}');

          if (isLogin.value) {
            if (users[email.value] && users[email.value] === password.value) {
              alert('Login bem-sucedido!');
              sessionStorage.setItem('loggedIn', 'true');
              sessionStorage.setItem('userEmail', email.value);
              console.log('Redirecionando para /cadastro-banco');
              router.push('/cadastro-banco');
            } else {
              alert('Email ou senha inválidos');
            }
          } else {
            if (users[email.value]) {
              alert('Email já cadastrado');
              loading.value = false;
              return;
            }

            users[email.value] = password.value;
            sessionStorage.setItem('users', JSON.stringify(users));
            alert('Conta criada com sucesso!');
            isLogin.value = true;
          }

          loading.value = false;
        }, 800);
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
