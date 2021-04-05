<style scoped>
  .bg-login{
    background: #5433FF;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #A5FECB, #20BDFF, #5433FF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #A5FECB, #20BDFF, #5433FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    background-size: 100%; 
  }
  
</style>
<template>
  <v-app class="bg-login" >
    <!-- <svg xmlns="http://www.w3.org/2000/svg" style="" viewBox="0 0 1440 320"><path fill="#5000ca" fill-opacity="1" d="M0,96L26.7,122.7C53.3,149,107,203,160,202.7C213.3,203,267,149,320,112C373.3,75,427,53,480,69.3C533.3,85,587,139,640,160C693.3,181,747,171,800,181.3C853.3,192,907,224,960,229.3C1013.3,235,1067,213,1120,218.7C1173.3,224,1227,256,1280,250.7C1333.3,245,1387,203,1413,181.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg> -->
    <v-main>
      <v-container class="fill-height">
        <nuxt /> 
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"; 
@Component({
    middleware({$auth ,redirect}){
    if ($auth.loggedIn) {
      redirect('/')
    }
   },
})
export default class LoginSession extends Vue {
 
}
</script>
