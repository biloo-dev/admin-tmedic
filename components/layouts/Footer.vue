<template>
  <v-footer
    id="default-footer"
    color="transparent"
    absolute
    app
    inset
  >
    <links />
  </v-footer>
</template>

<script lang="ts">
  import Links from '~/components/Links.vue'
 import { Component, Vue } from 'vue-property-decorator'
  @Component({
    components : {Links}
  })
  export default class DefaultFooter extends Vue {

  } 
</script>
