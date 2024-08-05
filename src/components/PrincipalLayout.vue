<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title> </v-toolbar-title>
      <BreadcrumbsRegistry />
    </v-app-bar>

    <v-main>
      <main>
        <router-view></router-view>
      </main>
    </v-main>
  </v-app>
</template>

<script setup>
  import BreadcrumbsRegistry from './BreadcrumbsRegistry.vue'
</script>
