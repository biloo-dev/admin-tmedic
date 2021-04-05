<template>
  <default-list :items="items" class="mb-n2" />
</template>
<script lang="ts"> 
  interface IItems {
    title : string;
    icon? : string;
    items? : this[];
  }
  import List from "~/components/layouts/List.vue";
  import { Component, Vue ,Watch } from 'vue-property-decorator'
  @Component({
    components : { List }
  }) 
  export default class DefaultAccountSettings extends Vue {
    items :IItems[] = [
        {
          title: 'John Leider',
          icon: 'mdi-vuetify',
          items: [
            {
              title: 'My Profile',
            },
            {
              title: 'Edit Profile',
            },
            {
              title: 'Settings',
            },
          ],
        },
      ]
 
  }
</script>
 