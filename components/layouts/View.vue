<template>
  <v-main>
    <v-container fluid>
      <router-view :key="$route.path" />
    </v-container>
  </v-main>
</template>
 
<script lang="ts">  
  import { Component, Vue } from 'vue-property-decorator'
  @Component 
  export default class DefaultView extends Vue { }
</script>