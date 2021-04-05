<template>
  <v-app-bar
    id="default-app-bar"
    app
    absolute
    class="v-bar--underline"
    color="transparent"
    :clipped-left="$vuetify.rtl"
    :clipped-right="!$vuetify.rtl"
    height="60"
     
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawer = !drawer"
    />

    <default-drawer-toggle class="hidden-sm-and-down" />

    <!-- <v-toolbar-title
      class="font-weight-light text-h5"
      v-text="name"
    /> -->

    <v-spacer />

    <!-- <default-search class="hidden-sm-and-down" /> -->

    <DefaultLanguage />
    <default-go-home />

    <!-- <default-notifications /> -->

    <default-account />
  </v-app-bar>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import DefaultAccount from "~/components/layouts/widgets/Account.vue";
  import DefaultLanguage from "~/components/layouts/widgets/Language.vue";
  import DefaultDrawerToggle from "~/components/layouts/widgets/DrawerToggle.vue";
  import DefaultGoHome from "~/components/layouts/widgets/GoHome.vue";
  import DefaultNotifications from "~/components/layouts/widgets/Notifications.vue";
  import DefaultSearch from "~/components/layouts/widgets/Search.vue";
  import { State } from 'vuex-class'
  import { RootState } from '~/store'
  @Component({
    components : {
      DefaultAccount,DefaultLanguage,DefaultDrawerToggle,DefaultGoHome,DefaultNotifications,DefaultSearch
    }
  }) 
  export default class DefaultBar extends Vue {
    @State((state: RootState) => state.app.drawer) drawer!:boolean  
    @State((state: RootState) => state.app.mini) mini!: boolean
    name : string = "" 
  } 
</script>
