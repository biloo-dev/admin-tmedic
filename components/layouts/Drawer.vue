<template>
  <v-navigation-drawer
    id="default-drawer"
    :value="drawers"
    :dark="dark"
    :right="$vuetify.rtl"
    :src="drawerImage ? image : ''"
    :mini-variant.sync="mini"
    mini-variant-width="80"
    app
    width="260"
    @change="$store.commit('app/drawer',!drawers)"
  >
    <template
      v-if="drawerImage"
      #img="props"
    >
      <v-img
        :key="image"
        :gradient="gradient"
        v-bind="props"
      />
    </template>

    <div class="px-2">
      <default-drawer-header />

      <v-divider class="mx-3 mb-2" />

      <default-list :items="items" />
    </div>

    <template #append>
         
    </template>

    <div class="pt-12" />
  </v-navigation-drawer>
</template> 
<script lang="ts">
  import  DefaultDrawerHeader  from "~/components/layouts/widgets/DrawerHeader.vue";
  import  DefaultList  from "~/components/layouts/List.vue";
  import { Component, Vue,Watch } from 'vue-property-decorator'
  import { State,Getter } from 'vuex-class'
  import { RootState } from '~/store'
  import { IItems } from "~/interfaces/global";

  @Component({
    components: {
      DefaultDrawerHeader ,DefaultList 
    },
  }) 
  export default class DefaultDrawer extends Vue {
    @State((state: RootState) => state.app.drawer) drawer!:boolean | null  
    @State((state: RootState) => state.app.mini) mini!: boolean
    @State((state: RootState) => state.app.drawerImage) drawerImage!: boolean
    @State((state: RootState) => state.app.items) items!: IItems 
    drawers : boolean | null = false
    @Getter('user/gradient') gradient!: string  
    @Getter('user/image') image!: string   
    @Getter('user/dark') dark!: string   
    @Watch('drawers')
    onDrawersChange(val : boolean){
      console.log('val :>> ', val);
    }
    name : string = "" 
    version : string = "" 
    created(){
       this.drawers = this.drawer
    }
  } 
  
</script>

<style lang="sass">
#default-drawer
  .v-list-item
    margin-bottom: 8px

  .v-list-item::before,
  .v-list-item::after
    display: none

  .v-list-group__header__prepend-icon,
  .v-list-item__icon
    margin-top: 12px
    margin-bottom: 12px
    margin-left: 4px

  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important
</style>
