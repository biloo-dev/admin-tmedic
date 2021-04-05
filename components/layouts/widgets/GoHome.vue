<template>
  <v-btn
    class="ml-2"
    min-width="0"
    text
    to="/"
    exact
  >
    <v-icon>mdi-view-dashboard</v-icon>
  </v-btn>
</template>

<script lang="ts">  
  import { Component, Vue } from 'vue-property-decorator'
  @Component 
  export default class DefaultGoHome extends Vue { }
</script>
