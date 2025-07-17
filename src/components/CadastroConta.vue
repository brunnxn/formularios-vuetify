<template>
  <v-container class="d-flex justify-center">
    <v-card elevation="12" class="pa-5 ma-5" max-width="100%" width="700px">
      <v-card-title>Cadastro de Conta Bancária</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-select
            v-model="conta.banco"
            :items="bancos"
            label="Banco"
            required
          ></v-select>

          <v-row>
            <v-col>
              <v-text-field
                v-model="conta.agencia"
                label="Agência"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="conta.digitoAgencia"
                label="Dígito da Agência"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="conta.numeroConta"
                label="Número da Conta"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="conta.digitoConta"
                label="Dígito da Conta"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            v-model="conta.saldoInicial"
            label="Saldo Inicial"
            prefix="R$"
            type="number"
            required
          ></v-text-field>

          <v-text-field
            v-model="conta.dataCriacao"
            label="Data de Criação da Conta"
            type="date"
            required
          ></v-text-field>

          <v-switch
            v-model="conta.ativa"
            label="Conta Ativa"
          ></v-switch>

          <v-btn color="primary" @click="salvarConta">Salvar Conta</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      bancos: [
        "Banco do Brasil",
        "Bradesco",
        "Caixa Econômica Federal",
        "Itaú",
        "Santander",
      ],
      conta: {
        banco: "",
        agencia: "",
        digitoAgencia: "",
        numeroConta: "",
        digitoConta: "",
        saldoInicial: "",
        dataCriacao: "",
        ativa: true,
      },
    };
  },
  methods: {
    salvarConta() {
      if (this.$refs.form.validate()) {
        // Salvar no sessionStorage
        sessionStorage.setItem("conta", JSON.stringify(this.conta));
        alert("Conta salva com sucesso!");
      } else {
        alert("Preencha todos os campos obrigatórios.");
      }
    },
  },
  mounted() {
    const contaSalva = sessionStorage.getItem("conta");
    if (contaSalva) {
      this.conta = JSON.parse(contaSalva);
    }
  },
};
</script>
