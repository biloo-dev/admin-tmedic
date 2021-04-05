<template>
 <v-data-table :headers="headers" :search="search" :items="roles" sort-by="calories" class="elevation-1" :loading="isLoadin" loading-text="Loading... Please wait">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ $t('general.roleManagment') }} </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field label="Search .." append-icon="mdi-magnify" dense hide-details  v-model="search" outlined ></v-text-field>
        
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2 pngtertr" @click="editedIndex = false" v-bind="attrs" v-on="on">
              {{ $t('general.newRole') }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title  class="headline grey lighten-2">
              <span class="headline">{{ formTitle }} </span>
            </v-card-title> 
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-card> 
                    <v-tabs color=" " :right="$i18n.locale == 'ar'">
                      <v-tab v-for="lang in languages" :key="lang.locale"><img :src="$url.img(lang.img)" :class="$i18n.locale =='ar' ? 'ml-2' : 'mr-2'"> {{ lang.title }}</v-tab>
                        <v-tab-item v-for="lang in languages" :key="lang.locale" class="pa-2">
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field :rules="v.required" :placeholder="lang.title" prepend-inner-icon="mdi-pen-plus" 
                              v-model="editedRole['name_'+lang.locale]" label="Name Role" dense hide-details="auto" outlined>
                                <template v-slot:append>
                                  <img :src="$url.img(lang.img)" alt="">
                                </template>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-textarea :rules="v.required" :placeholder="lang.title" v-model="editedRole['description_'+lang.locale]" label="Description" 
                                          append-icon="" dense hide-details="auto" outlined>
                                <template v-slot:append>
                                  <img :src="$url.img(lang.img)" alt="">
                                </template>
                              </v-textarea>
                            </v-col>
                          </v-row>
                        </v-tab-item>
                      </v-tabs>
                    <v-card-actions>
                      <v-row> 
                        <v-col>  
                          <v-tabs v-model="tabPerm" :right="$i18n.locale == 'ar'">
                            <v-tab v-for="(mod , i) in model" :key="i">{{ i }}</v-tab>  
                            <v-tabs-items v-model="tabPerm" > 
                                <v-tab-item  v-for="(act , i) in model" :key="i" > 
                                <v-card flat>
                                  <v-card-text class="d-flex justify-space-around" > 
                                    <v-checkbox hide-details :rules="[v => v.length > 0 || '']"
                                      v-model="editedRole.permissions" v-for="(d , t) in act" :key="t" 
                                      :value="`${d}_${i}`" :label="d.toString().toUpperCase()" ></v-checkbox>  
                                  </v-card-text> 
                                </v-card> 
                              </v-tab-item>  
                            </v-tabs-items>  
                          </v-tabs>
                          <v-divider></v-divider>
                          <v-card-actions class="d-flex justify-center bt-2" >
                            <v-alert v-if="editedRole.permissions.length == 0" class="mt-3" dense outlined  type="error" >
                              The <strong>Role</strong> must have one or more <strong>permissions</strong> !!
                            </v-alert>
                          </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-container>
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
      {{ item['name_'+$i18n.locale]}}
    </template>
    <template v-slot:item.description="{ item }">
      {{ item['description_'+$i18n.locale]}}
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
        <v-icon small @click="editRole(item)">
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn small elevation="" fab color="error" v-if="![1,2,3].includes(item.id)">
        <v-icon small @click="deleteRole(item)">
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      No Date
    </template>
  </v-data-table>
</template>

<script lang="ts">
  import {  Component, Vue, Watch } from "vue-property-decorator";
  import { State,Getter } from 'vuex-class'
  import { RootState } from '~/store'
  import { IRoles,IPermissions } from "~/interfaces/users"; 
  import dataLanguages from "~/data/languages"; 
  import v from "~/data/validation";
  interface ILanguage { title: string; img: string; locale: string; dir : string}
  var _ = require('lodash');
  @Component
  export default class Links extends Vue { 
    @State((state: RootState) => state.users.roles) roles!: IRoles[]
    @State((state: RootState) => state.users.permissions) permissions!: IPermissions[]
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
    v : any= v
    valid: boolean | null = null
    dialog: boolean = false
    tabPerm: boolean = false 
    tab: boolean = false 
    editedIndex: boolean = false
    editedRole: any = {
      slug : "",
      name_fr : "",
      name_ar : "",
      name_en : "",
      description_fr : "",
      description_ar : "",
      description_en : "",
      permissions : []
    }
    defaultRole: any = {
      slug : "",
      name_fr : "",
      name_ar : "",
      name_en : "",
      description_fr : "",
      description_ar : "",
      description_en : "",
      permissions : []
    }
    get formTitle() { 
      return this.editedIndex == false ?  this.$t('general.newRole')  : this.$t('general.editRole')
    }  
    @Watch("dialog")
    onDialogChange(val: any) {
      val || this.close()
    }
    editRole(role: IRoles) {
      this.editedIndex = true
      this.editedRole = JSON.parse(JSON.stringify(role)) 
      this.editedRole.permissions = this.editedRole.permissions.map((e :any) => e.slug)
      this.dialog = true
      this.$nextTick(() => { 
        this.$refs && this.$refs.form.resetValidation()
      })

    } 
    deleteRole(user: IRoles) {
      this.editedIndex = false
      this.$url.delete().then(() => {
        this.$store.dispatch('users/deleteRole',user.id)
      }) 
    }
    close() {
      this.dialog = false 
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
      this.$nextTick(() => {
        this.editedRole = JSON.parse(JSON.stringify(this.defaultRole))
        this.editedIndex = false
      })
    }
    closeDelete() { 
      this.$nextTick(() => {
        this.editedRole = JSON.parse(JSON.stringify(this.defaultRole))
        this.editedIndex = false
      })
    } 
    get perm(){
        return this.permissions.reduce((a :any, b :any) => {  
          if (!a.includes(b.slug.split("_")[0])) a.push(b.slug.split("_")[0]); 
          return a;
        }, []); 
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
    async save() {
      this.$refs.form.validate()  
      if (!this.editedIndex) { 
        let chk = await this.$store.dispatch('users/setRole',this.editedRole)
        this.dialog = !chk
      } else {  
        let chk = await this.$store.dispatch('users/updateRole',this.editedRole)
        this.dialog = !chk
      }
      // this.close()
    }
    created() {
      this.headers = [
        {
          text: this.$t('roles.num'),
          value: 'id',
          sortable: true, 
        },
        {
          text: this.$t('roles.name'),
          align: 'start',
          value: 'name'
        },
        {
          text: this.$t('roles.description'),
          value: 'description'
        }, 
        {
          text: this.$t('roles.actions'),
          value: 'actions',
          sortable: false
        },
      ]
      // this.$store.dispatch('users/getRoles') 
    }
    headers: any = [ ] 
  }
</script>

<style lang="sass" scoped>
 
</style>
