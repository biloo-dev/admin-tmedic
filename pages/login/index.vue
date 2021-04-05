<style scoped>

  .login-placeHolder:before{
    position: absolute;
    top: -100px;
    right: 0;
    width: 400px;
    height: 2px;
    background: rgb(211, 210, 210);
  }
  .login-placeHolder:after{
    position: absolute;
    top: 0;
    right: -200px;
    width: 400px;
    height: 2px;
    background: rgb(211, 210, 210);
  }
  .login-placeHolder{
    height: 200px;
    background: transparent;
    width: 35%;
    margin: 20px auto;
    border: 2px solid rgb(211, 210, 210);
    border-radius: 50% ;
  }
</style>
<template> 
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-card style="background-color :#42424273" elevation="">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="login-placeHolder"></div>
              <v-text-field v-model="email" prepend-inner-icon="mdi-account-outline" 
              dark outlined dense :counter="10" 
              :rules="v.emailRules" label="E-mail" required></v-text-field>

              <v-text-field v-model="password" :type="hide ? 'password':'text'"
               @click:append="hide = !hide" :append-icon="hide ? 'mdi-eye':'mdi-eye-off'" prepend-inner-icon="mdi-key" 
               dark outlined dense :rules="v.passwordRules" label="Password" required></v-text-field>

              <v-checkbox v-model="checkbox" dark  label="keep me login?" required></v-checkbox>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn :disabled="!valid"  color="primary" block large class="mr-4"  @click.prevent="submit">
                Login  <v-icon class="mx-2">mdi-login-variant</v-icon> 
              </v-btn> 
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>  
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import v from "~/data/validation";
 @Component({
   middleware({$auth ,redirect}){
    if ($auth.loggedIn) {
      redirect('/')
    }
   },
   layout: 'session'
 })
 export default class DefautLayout extends Vue {
   hide: boolean = true
   valid: boolean = true
   v : any = v
   password: string = 'admin123' 
   email: string = 'admin@gmail.com' 
   select: string | null = null 
   checkbox: boolean = false
   submit() { 
     let form = {email:this.email,password :this.password}
      try {
        this.$auth.loginWith('local',{data :form})
      } catch (err) {
        console.log('err :>> ', err);
      }
   } 
 }
</script>
