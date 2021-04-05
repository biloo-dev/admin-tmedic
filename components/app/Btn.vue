<template>
  <v-btn
    :color="color"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-btn>
</template>
<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator' 

  @Component
  export default class AppBtn extends Vue {
      @Prop({ type: String, default: () => 'primary' }) color!: string 
  }
 
</script>
