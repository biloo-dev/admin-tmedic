<template>
  <div>
    <v-menu
      bottom
      left
      min-width="200"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text :close-on-content-click="false"
        v-bind="attrs" v-on="on" >
         <span class="mx-2">{{ $auth.user['firstName_'+$i18n.locale] }}</span>
          
         <v-avatar size="30px">
              <img :src="$url.img($auth.user.img)"  >
          </v-avatar>
        
      </v-btn>
    </template>

    <v-list :tile="false" flat nav >
      <template v-for="(p, i) in profile">
        <v-divider v-if="p.divider" :key="`divider-${i}`" class="mb-2 mt-2"/> 
        <app-bar-item v-else :key="`item-${i}`" :to="p.to" @logout="logout()" :item="p"></app-bar-item>
      </template>
    </v-list>
  </v-menu> 
  </div>
</template>
<script lang="ts"> 
  interface Iprofile {
    title? : string;
    to? : string | boolean;
    divider? : boolean;
  } 
  import { Component, Vue } from 'vue-property-decorator'
  @Component 
  export default class DefaultAccount extends Vue { 
    item = {
      title : "titleAlertLogout",
      text : "textAlertLogout"
    }
    profile :Iprofile[] = [
      { title: 'Profile', to : "/Profile" },
      { title: 'Settings', to : "/Settings" },
      { divider: true },
      { title: 'Log out', to : "false" },
    ] 
    logout(){
      this.$url.logout()
      .then(result => {
        if (result.isConfirmed) {
          this.$auth.logout()
        }
      })
    }
 
  }
</script>
