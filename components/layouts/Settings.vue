<template>
<div id="settings-wrapper">
  <v-card id="settings" class="py-2 px-4" color="rgba(0, 0, 0, .3)" dark flat link min-width="100" style="position: fixed; top: 115px; right: -35px; border-radius: 8px; z-index: 1;">
    <v-icon large>
      mdi-cog
    </v-icon>
  </v-card>

  <v-menu v-model="menu" :close-on-content-click="false" activator="#settings" bottom content-class="v-settings" left nudge-left="8" offset-x origin="top right" transition="scale-transition">
    <v-card class="text-center mb-0" width="300">
      <v-card-text>
        <strong class="mb-3 d-inline-block">SIDEBAR FILTERS</strong>

        <v-item-group v-model="color" mandatory>
          <v-item v-for="color in colors" :key="color" :value="color">
            <template v-slot="{ active, toggle }">
              <v-avatar :class="active && 'v-settings__item--active'" :color="color" class="v-settings__item mx-1" size="25" @click="toggle" />
            </template>
          </v-item>
        </v-item-group>

        <v-divider class="my-4 secondary" />

        <strong class="mb-3 d-inline-block">SIDEBAR BACKGROUND</strong>

        <v-item-group v-model="isGradient" mandatory>
          <v-item v-for="(scrim, index) in gradients" :key="scrim" :value="index" class="mx-1">
            <template v-slot="{ active, toggle }">
              <v-avatar :class="active && 'v-settings__item--active'" :color="scrim" class="v-settings__item" size="24" @click="toggle" />
            </template>
          </v-item>
        </v-item-group>

        <v-divider class="my-4 secondary" />

        <v-row align="center" no-gutters>
          <v-col cols="auto">
            Dark Mode
          </v-col>

          <v-spacer />

          <v-col cols="auto">
            <v-switch v-model="$vuetify.theme.dark" class="ma-0 pa-0" color="secondary" hide-details />
          </v-col>
        </v-row>

        <v-divider class="my-4 secondary" />

        <v-row align="center" no-gutters>
          <v-col cols="auto">
            Sidebar Mini
          </v-col>

          <v-spacer />

          <v-col cols="auto">
            <v-switch v-model="isMini" class="ma-0 pa-0" color="secondary" hide-details />
          </v-col>
        </v-row>

        <v-divider class="my-4 secondary" />

        <v-row align="center" no-gutters>
          <v-col cols="auto">
            Sidebar Image
          </v-col>

          <v-spacer />

          <v-col cols="auto">
            <v-switch v-model="IsDrawerImage" class="ma-0 pa-0" color="secondary" hide-details />
          </v-col>
        </v-row>

        <v-divider class="my-4 secondary" />

        <strong class="mb-3 d-inline-block">IMAGES</strong>

        <v-card :disabled="!IsDrawerImage" flat>
          <v-item-group v-model="isIimage" class="d-flex justify-space-between mb-3">
            <v-item v-for="(img, index) in images" :key="img" :value="index" class="mx-1">
              <template v-slot="{ active, toggle }">
                <v-sheet :class="active && 'v-settings__item--active'" class="d-inline-block v-settings__item" @click="toggle">
                  <v-img :src="img" height="100" width="50" />
                </v-sheet>
              </template>
            </v-item>
          </v-item-group>
        </v-card>

        <v-btn block class="mb-3" color="grey darken-1" dark href="https://vuetifyjs.com/components/api-explorer" rel="noopener" target="_blank">
          Vuetify Documentation
        </v-btn>

        <v-btn block color="info" href="https://store.vuetifyjs.com/products/vuetify-material-dashboard-free" rel="noopener" target="_blank">
          Get Free Demo
        </v-btn>

        <div class="my-12" />

        <div>
          <strong class="mb-3 d-inline-block">THANK YOU FOR SHARING!</strong>
        </div>

        <v-btn class="ma-1" color="#55acee" dark rounded>
          <v-icon>mdi-twitter</v-icon>
          - 45
        </v-btn>

        <v-btn class="ma-1" color="#3b5998" dark default rounded>
          <v-icon>mdi-facebook</v-icon>
          - 50
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</div>
</template>

<script lang="ts">
 import { Component, Vue, Watch } from 'vue-property-decorator'
 import { State,Getter } from 'vuex-class' 
 import { RootState } from '~/store'
 import { IItems, IDrawer } from "~/interfaces/global";

 @Component({ 
   components: {}, 
 })
 export default class DashboardCoreSettings extends Vue {
    @State((state: RootState) => state.app.drawer) drawer!: null
    @State((state: RootState) => state.app.mini) mini!: boolean
    @State((state: RootState) => state.app.drawerImage) drawerImage!: boolean
    @State((state: RootState) => state.app.items) items!: IItems

    @State((state: RootState) => state.user.dark) dark!: boolean
    @State((state: RootState) => state.user.drawer) drawers!: IDrawer
    @State((state: RootState) => state.user.gradients) gradients!: string[]
    @State((state: RootState) => state.user.images) images!: string[]
    @Getter('user/gradient') gradient!: string  
    @Getter('user/image') image!: string   
    // @Getter('user/dark') dark!: string    
    menu : boolean = false
    color:string = '#E91E63'
    colors:string[] = [
        '#9C27b0',
        '#00CAE3',
        '#4CAF50',
        '#ff9800',
        '#E91E63',
        '#FF5252',
    ] 
    saveImage:string = ''
    IsDrawerImage : boolean = false
    isMini : boolean = false
    isGradient : boolean = false
    isIimage : boolean = false
    @Watch('isMini')
    onIsMiniChange(val:boolean) {
      this.$store.commit('app/mini',val)
    }
    @Watch('isGradient')
    onIsIsGradientChange(val:boolean) {
      this.$store.commit('user/gradient',val)
    }
    @Watch('isIimage')
    onIsIimageChange(val:boolean) {
      this.$store.commit('user/image',val)
    }
    @Watch('IsDrawerImage')
    onIsDrawerImageChange(val:boolean) {
      this.$store.commit('app/drawerImage',val)
    }
    created(){ 
      this.isMini = this.mini
      this.isGradient = this.mini
      this.IsDrawerImage = this.drawerImage
    }
   @Watch('color')
   onColorChange(val: string) {
     this.$vuetify.theme.themes[this.dark ? 'dark' : 'light'].primary = val
   }
 }
</script>

<style lang="sass">
  .v-settings
    .v-item-group > *
      cursor: pointer

    &__item
      border-width: 3px
      border-style: solid
      border-color: transparent !important

      &--active
        border-color: #00cae3 !important
</style>
