<template>
    <v-row>
        <v-breadcrumbs :items="registrySections" >
        <template v-slot:divider>
            <v-icon icon="mdi-forward"></v-icon>
        </template>
        </v-breadcrumbs>
    </v-row>
</template>
  
<script>
import { ref } from 'vue';
export default {
  setup() {
    let registrySections = ref([
      {
        title: 'Sign up',
        disabled: true,
        href: 'link1',
        divider: '-'
      },
      {
        title: 'Name',
        disabled: true,
        href: 'link2'
      },
      {
        title: 'Business Info',
        disabled: true,
        href: 'link3'
      },
      {
        title: 'Branding',
        disabled: false,
        href: '/branding'
      },
    ])

    return {
        registrySections 
    }
  }

}
</script>

<style>
  .breadcrumb-line {
    min-width: 40px;
    height: 2px;
    background-color: #42b983;
    
  }
</style>

