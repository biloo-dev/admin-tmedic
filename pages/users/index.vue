 
<template>
  <div>
    <v-data-table :headers="headers" :search="search" :items="users" sort-by="calories" class="elevation-1" :loading="isLoadin" loading-text="Loading... Please wait">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t('general.userManagment') }} </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field label="Search .." append-icon="mdi-magnify" dense hide-details  v-model="search" outlined ></v-text-field>
          
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="750px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2 pngtertr" @click="editedIndex = false" v-bind="attrs" v-on="on">
                {{ $t('general.newUser') }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title  class="headline grey lighten-2">
                <span class="headline">{{ formTitle }} </span>
              </v-card-title> 
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation> 
                    <v-card class="mt-4">
                    <v-card-title>
                      <v-row>
                        <v-col cols="12" sm="12" md="8">
                          <v-tabs color="deep-purple accent-4" :right="$i18n.locale == 'ar'">
                            <v-tab v-for="lang in languages" :key="lang.locale"><img :src="$url.img(lang.img)" :class="$i18n.locale =='ar' ? 'ml-2' : 'mr-2'"> {{ lang.title }}</v-tab>
                            <v-tab-item v-for="lang in languages" :key="lang.locale" class="pa-2">
                              <v-row>
                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field :rules="v.required" :placeholder="lang.title"  prepend-inner-icon="mdi-card-account-details-outline" v-model="editedUser['firstName_'+lang.locale]" label="firstName" append-icon="" dense hide-details="auto" outlined>
                                    <template v-slot:append>
                                      <img :src="$url.img(lang.img)" alt="">
                                    </template>
                                  </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field :rules="v.required" :placeholder="lang.title"  prepend-inner-icon="mdi-card-account-details-outline" v-model="editedUser['lastName_'+lang.locale]" label="LastName" append-icon="" dense hide-details="auto" outlined>
                                    <template v-slot:append>
                                      <img :src="$url.img(lang.img)" alt="">
                                    </template>
                                  </v-text-field>
                                </v-col>
                              </v-row>
                            </v-tab-item>
                          </v-tabs>
                        </v-col>
                        <v-col cols="12" sm="12" md="4">
                          <v-card hover rounded="circle" height="150" :img="url || $url.img('/images/avatars/avatar-1.png')" class="ma-auto" width="150" outlined flat @click="$refs.fileInput.click()">
                            <input accept="image/*" ref="fileInput" @change="onFileChange" type="file" class="d-none" label="" /> 
                          </v-card> 
                        </v-col> 
                      </v-row>
                     </v-card-title>
                      <v-card-text class="px-6">
                        <v-row>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field placeholder="UserName" :rules="v.required" prepend-inner-icon="mdi-badge-account" v-model="editedUser.username" label="username" dense hide-details="auto" outlined> </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field placeholder="E-mail" :rules="v.emailRules" prepend-inner-icon="mdi-mail" v-model="editedUser.email" label="E-mail" dense hide-details="auto" outlined> </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field placeholder="Phone (1)" :rules="v.required" prepend-inner-icon="mdi-phone" type="number" v-model="editedUser.phone1" label="Phone (1)" dense hide-details="auto" outlined> </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field placeholder="Phone (2)" prepend-inner-icon="mdi-phone-classic" type="number" v-model="editedUser.phone2" label="Phone (2)" dense hide-details="auto" outlined> </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-divider></v-divider>
                            <v-radio-group v-model="editedUser.sexe" row dense hide-details="auto" >
                              <v-radio :label="$t('users.male')"  prepend-inner-icon="mdi-face-outline" color="info" :value="0"></v-radio>
                              <v-radio :label="$t('users.female')"  prepend-inner-icon="mdi-face-woman-shimmer-outline" color="success" :value="1"></v-radio>
                            </v-radio-group>
                          </v-col> 
                          <v-col cols="12" sm="12" md="6">
                            <v-divider></v-divider> 
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-divider></v-divider>
                            <v-text-field v-model="editedUser.password" :type="hide ? 'password':'text'" hide-details="auto"
                                @click:append="hide = !hide" :append-icon="hide ? 'mdi-eye':'mdi-eye-off'" prepend-inner-icon="mdi-key" 
                                  outlined dense :rules="!editedIndex ? v.passwordRules: []" label="Password" required></v-text-field> 
                            <!-- <v-text-field placeholder="Password" type="password" v-model="editedUser.password" label="password" dense hide-details="auto" outlined> </v-text-field> -->
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-divider></v-divider>
                            <v-text-field v-model="editedUser.confirmPassword" :type="hideConfirm ? 'password':'text'" hide-details="auto"
                                @click:append="hideConfirm = !hideConfirm" :append-icon="hideConfirm ? 'mdi-eye':'mdi-eye-off'" prepend-inner-icon="mdi-key" 
                                  outlined dense :rules="!editedIndex ? [
                                    ...v.passwordRules,
                                    v => v == editedUser.password || 'The password verification field does not match'
                                  ] : []" label="Confirm PAssworsd" required></v-text-field> 
                            <!-- <v-text-field placeholder="Confirm Passworsd" type="password" v-model="editedUser.confirmPassword" label="Confirm PAssworsd" dense hide-details="auto" outlined> </v-text-field> -->
                          </v-col>
                          <v-divider class="" ></v-divider>
                          <v-col cols="12" sm="12">  
                            <v-card  max-width=""  > 
                              <v-card-text> 
                                <h3>Roles *</h3>
                                  <v-divider></v-divider>
                                  <v-radio-group v-model="editedUser.role" row >
                                    <v-radio :label="role['name_'+$i18n.locale]" @change="selectRole(role,false)" :rules="v.required" :value="role.id" v-for="role in roles" :key="role.id" ></v-radio> 
                                  </v-radio-group> 
                              </v-card-text> 
                            </v-card>
                          </v-col> 
                          <v-col cols="12" sm="12">  
                            <v-tabs v-model="tabPerm" :right="$i18n.locale == 'ar'">
                              <v-tab v-for="(mod,i) in model" :key="i">{{ i }}</v-tab>  
                              <v-tabs-items v-model="tabPerm" > 
                                  <v-tab-item  v-for="(act,i) in model" :key="i" > 
                                  <v-card flat>
                                    <v-card-text class="d-flex justify-space-around" > 
                                      <template v-for="(d , t) in act"> 
                                        <v-checkbox hide-details :rules="[v => v.length > 0 || '']" ref="checkbox" :readonly="hasPerm(`${d}_${i}`)"
                                          v-model="editedUser.permissions" :key="t"  :input-value="`${d}_${i}`"
                                          :value="`${d}_${i}`" :label="d.toString().toUpperCase()" ></v-checkbox>  

                                      </template>
                                      </v-card-text> 
                                  </v-card> 
                                </v-tab-item>  
                              </v-tabs-items>  
                            </v-tabs>
                            <v-divider></v-divider>
                            <v-card-actions class="d-flex justify-center bt-2" >
                              <v-alert v-if="editedUser.permissions.length == 0" class="mt-3" dense outlined  type="error" >
                                The <strong>Role</strong> must have one or more <strong>permissions</strong> !!
                              </v-alert>
                            </v-card-actions> 
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card> 
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error darken-1" dark @click="close">
                  {{ $t('general.cancel') }} <v-icon></v-icon> 
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn  :color="editedIndex ? 'success' : 'blue' " :disabled="!valid" dark @click="save">
                  {{ $t('general.save') }} <v-icon>mdi-content-save</v-icon>  
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> 
        </v-toolbar>
      </template>
      <template v-slot:item.img="{ item }">
        <v-avatar size="38">
          <img :src="$url.img(item.img)" alt="">
        </v-avatar>
      </template>
      <template v-slot:item.name="{ item }">
        {{ item['firstName_'+$i18n.locale] + " " + item['lastName_'+$i18n.locale] }}
      </template>
      <template v-slot:item.sexe="{ item }">
        <v-chip color="primary" dark v-if="item.sexe == 0">
          {{ $t('users.male') }}
        </v-chip>
        <v-chip color="warning" dark v-else>
          {{ $t('users.female') }}
        </v-chip> 
      </template>
      <template v-slot:item.type="{ item }">
        <v-chip color="error" dark v-if="item.type == 0">
          {{ $t('users.admin') }}
        </v-chip>
        <v-chip color="info" dark v-else>
          {{ $t('users.user') }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn small elevation="" fab color="success">
          <v-icon small @click="editUser(item)">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn small elevation="" fab color="error" v-if="item.id !== $auth.user.id">
          <v-icon small @click="deleteUser(item)">
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        No Date
      </template>
    </v-data-table>
    <br><br><br>
    <Roles />
  </div>
</template>

<script lang="ts">
var _ = require('lodash');
import {  Component, Vue, Watch } from "vue-property-decorator";
import Roles from "~/components/Roles/role.vue";
import { State } from 'vuex-class'
import { RootState } from '~/store'
import { IUsers } from "~/interfaces/users"; 
import { IRoles,IPermissions } from "~/interfaces/users"; 
import dataLanguages from "~/data/languages"; 
import v from "~/data/validation";
interface ILanguage { title: string; img: string; locale: string; dir : string}
@Component({
  components : { Roles }
 })
export default class DashboardView extends Vue {
  @State((state: RootState) => state.users.roles) roles!: IRoles[]
  @State((state: RootState) => state.users.permissions) permissions!: IPermissions[]
  @State((state: RootState) => state.users.Users) users!: IUsers[]
  @State((state: RootState) => state.users.isLoadin) isLoadin!: boolean
  languages: ILanguage[] = dataLanguages.map((language) => {
    return {
      title: language.name,
      img: language.icon,
      dir: language.direction,
      locale: language.locale
    }
  })  
  search : string = ""
  url : any= null
  v : any= v
  file : any
  tabPerm : number = 0
  valid: boolean | null = null
  hide: boolean = true
  hideConfirm: boolean = true
  dialog: boolean = false
  tab: boolean = false 
  headers: any = []
  editedIndex: boolean = false
  editedUser: any = {
    username: "",
    firstName_fr: "",
    firstName_en: "",
    firstName_ar: "",
    lastName_fr: "",
    lastName_en: "",
    lastName_ar: "",
    sexe: 0,
    type: 0,
    phone1: "",
    phone2: "",
    img: "",
    email: "",
    password: "",
    confirmPassword: "",
    role : "",
    permissions : []
  }
  defaultUser: any = {
    username: "",
    firstName_fr: "",
    firstName_en: "",
    firstName_ar: "",
    lastName_fr: "",
    lastName_en: "",
    lastName_ar: "",
    sexe: 0,
    type: 0,
    phone1: "",
    phone2: "",
    img: "",
    email: "",
    password: "",
    confirmPassword: "",
    role : "",
    permissions : []
  }
  selectRole(role :any,check : boolean){
    if (check) {
      this.editedUser.permissions = [...role.permissions.map((e :any) => e.slug),...this.editedUser.permissions] 
    }else{
      this.editedUser.permissions = role.permissions.map((e :any) => e.slug)
    }
      
  }
  hasPerm(perm : string){ 
    return this.roles.some((e) => e.id === this.editedUser.role && e.permissions.some((e:any) => e.slug == perm)) 
  }
  get formTitle() { 
    return this.editedIndex == false ?  this.$t('general.newUser')  : this.$t('general.editUser')
  } 
  @Watch("dialog")
  onDialogChange(val: any) {
    val || this.close()
  }
  @Watch("dialogDelete")
  onDialogDeleteChange(val: any) {
    val || this.closeDelete()
  } 
  onFileChange(e :any) {
    this.file = e.target.files[0]; 
    this.url = URL.createObjectURL(this.file);
  } 
  editUser(user: IUsers) {
    this.editedIndex = true
    this.editedUser = JSON.parse(JSON.stringify(user)) 
    this.url = this.$url.img(this.editedUser.img)
    this.editedUser.password = ""
    this.editedUser.role = user.roles[0] ? user.roles[0].id : ""
    this.editedUser.permissions = this.editedUser.permissions.map((e :any) => e.slug)
    this.selectRole(user.roles[0],true) 
    this.dialog = true
    this.$nextTick(() => { 
      this.$refs && this.$refs.form.resetValidation()
    }) 
  }

  deleteUser(user: IUsers) {
    this.editedIndex = false
    this.$url.delete().then(() => {
      this.$store.dispatch('users/deleteUser',user.id)
    }) 
  }
  get model(){ 
    return this.permissions.reduce((a :any, b :any) => { 
      if (_.isEmpty(a) || !a[b.slug.split("_")[1]]) {
        a[b.slug.split("_")[1]] = [b.slug.split("_")[0]]
      }else if (a[b.slug.split("_")[1]]) {  
        a[b.slug.split("_")[1]].push(b.slug.split("_")[0])  
      } 
      return a;
    }, {}); 
  }

  close() {
    this.dialog = false 
    this.$refs.form.reset()
    this.$refs.form.resetValidation()
    this.$nextTick(() => {
      this.editedUser = JSON.parse(JSON.stringify(this.defaultUser))
      this.editedIndex = false
    })
  }

  closeDelete() { 
    this.$nextTick(() => {
      this.editedUser = JSON.parse(JSON.stringify(this.defaultUser))
      this.editedIndex = false
    })
  }

  async save() {
    this.$refs.form.validate()
    const form = new FormData(); 
    form.append('img',this.file)
    form.append('data',JSON.stringify(this.editedUser))
    if (!this.editedIndex) { 
      let chk = await this.$store.dispatch('users/setUser',form)
      this.dialog = !chk 
    } else {  
      let chk = await this.$store.dispatch('users/updateUser',form)
      this.dialog = !chk 
    } 
  }
  created() {
    this. headers = [
      {
        text: this.$t('users.img'),
        value: 'img',
        sortable: false, 
      },
      {
        text: this.$t('users.name'),
        align: 'start',
        value: 'name'
      },
      {
        text: this.$t('users.username'),
        value: 'username'
      },
      {
        text: this.$t('users.sexe'),
        value: 'sexe'
      },
      {
        text: this.$t('users.type'),
        value: 'type'
      },
      {
        text: this.$t('users.phone1'),
        value: 'phone1'
      },
      {
        text: this.$t('users.phone2'),
        value: 'phone2'
      },

      {
        text: this.$t('users.email'),
        value: 'email'
      },
      {
        text: this.$t('users.actions'),
        value: 'actions',
        sortable: false
      },
    ]
    this.$store.dispatch('users/getUsers')
    this.$store.dispatch('users/getRoles') 

  }
}
</script>
