<template> 
<Layout>
  <nuxt /> 
</Layout>
</template>
 
<script lang="ts"> 
import { Component, Vue } from 'vue-property-decorator'
import Layout from "~/components/layouts/index.vue";
  @Component({   
    middleware({$auth ,redirect,$url}){
        if (!$auth.loggedIn) {
          redirect($url.lang('/login'))
        }
    }, 
    components: {Layout},
  })
  export default class DefautLayout extends Vue {
  
  }
</script>