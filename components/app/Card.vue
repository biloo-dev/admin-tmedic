<template>
  <v-card
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-card>
</template>
<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator' 

  @Component
  export default class AppCard extends Vue { }
 
</script>
 
