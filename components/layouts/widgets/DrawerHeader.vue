<template>
  <v-list-item class="mb-0 justify-space-between pl-3">
    <v-list-item-avatar>
      <v-img
        :src="
          require('~/static/images/vmd.svg')"
      />
    </v-list-item-avatar>

    <v-list-item-content class="pl-2">
      <v-list-item-title class="text-h5">
        <strong class="mr-1 font-weight-black">Weby</strong>

        <span class="primary--text">Com</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

 <script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator' 

  @Component
  export default class DefaultDrawerHeader extends Vue { }
 
</script>
