<!-- src/layouts/default.vue -->
<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
