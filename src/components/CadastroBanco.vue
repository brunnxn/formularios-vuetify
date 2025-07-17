<template>
  <v-container class="d-flex justify-center">
    <v-card elevation="12" class="pa-5 ma-5" max-width="100%" width="700px">
      <v-card-title class="text-h6 font-weight-bold">
        Cadastro de Banco
      </v-card-title>

      <v-form ref="form" @submit.prevent="salvarBanco" v-model="formValido">
        <v-card-text>
          <v-text-field
            label="Número do Banco"
            v-model="banco.numero"
            :rules="[v => !!v || 'Campo obrigatório']"
            required
          />
          <v-text-field
            label="Descrição do Banco"
            v-model="banco.descricao"
            :rules="[v => !!v || 'Campo obrigatório']"
            required
          />
          <v-switch
            v-model="banco.ativo"
            label="Banco Ativo?"
            color="purple"
          />
        </v-card-text>

        <v-btn
          type="submit"
          color="light-blue lighten-2"
          class="white--text"
          block
        >
          SALVAR
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "CadastroBanco",
  setup() {
    const router = useRouter();
    const form = ref(null);
    const formValido = ref(false);

    const banco = ref({
      numero: "",
      descricao: "",
      ativo: false,
    });

    const salvarBanco = () => {
      if (form.value?.validate()) {
        sessionStorage.setItem("cadastroBanco", JSON.stringify(banco.value));
        alert("Banco salvo com sucesso!");
        router.push("/cadastro-conta");
      }
    };

    return {
      form,
      formValido,
      banco,
      salvarBanco,
    };
  },
};
</script>

<style scoped>
.v-card {
  background-color: #212121;
  color: white;
}
</style>
