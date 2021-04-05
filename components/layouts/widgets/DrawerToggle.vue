<template>
  <v-btn
    class="ml-3 mr-4"
    elevation="1"
    fab
    small
    @click="isMini = !isMini"
  >
    <v-icon>
      {{ isMini ? 'mdi-format-list-bulleted' : 'mdi-dots-vertical' }}
    </v-icon>
  </v-btn>
</template>
<script lang="ts"> 
  import { Component, Vue,Watch } from 'vue-property-decorator'
  import { State } from 'vuex-class'
  import { RootState } from '~/store'
  @Component
  export default class DefaultDrawerToggle extends Vue {
    @State((state: RootState) => state.app.mini) mini!: boolean 
    isMini : boolean = false
    @Watch('isMini')
    onIsMiniChange(val:boolean) {
      this.$store.commit('app/mini',val)
    }
    created(){ 
      this.isMini = this.mini
    }
  } 
</script>
 
