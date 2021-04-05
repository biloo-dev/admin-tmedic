 
<template> 
  <v-card>
    <v-card-title background-color="grey lighten-4 ">
      <h1>Settings Manager</h1> 
    </v-card-title>
    <v-card>  
      <v-card-text> 
        <div > 
          <v-row>
            <v-col cols="12" sm="6"> 
              <v-card class="pa-2">
                <v-tabs :right="$i18n.locale == 'ar'">
                <v-tab v-for="lang in languages" :key="lang.locale">
                  <img :src="$url.img(lang.img)" :class="$i18n.locale =='ar' ? 'ml-2' : 'mr-2'"> 
                  {{ lang.title }}
                </v-tab>
                <v-tab-item v-for="lang in languages" :key="lang.locale +'_'" class="pa-2" :class="lang.locale =='ar' ? 'rtl' : 'ltr'">
                  <v-row>
                    <template v-for="setting in Settings.filter(e => e.with_lang == 1)"> 
                      <v-col cols="12" sm="6" :key="setting.id +'-'" >
                        <h2 class="text-capitalize my-2">{{ setting['name_'+lang.locale] }}</h2>
                        <p class="text--gray">{{ setting['description_'+lang.locale] }}</p>
                      </v-col>
                      <v-col cols="12" sm="6" :key="setting.id +'+'" >
                        <div v-if="setting.type == 'text'">
                          <v-text-field type="text" :label="setting['name_'+lang.locale]"  :reverse="lang.locale =='ar'"
                                        :value="strToJson(setting,lang.locale)" outlined></v-text-field> 
                        </div>
                        <div v-else-if="setting.type == 'number'">
                          <v-text-field type="number"  :reverse="lang.locale =='ar'"
                                        :label="setting['name_'+lang.locale]" 
                                        :value="strToJson(setting,lang.locale)"
                                        outlined  ></v-text-field> 
                        </div>
                        <div v-else-if="setting.type == 'textarea'">  
                          <v-textarea type="number" :label="setting['name_'+$i18n.locale]"  :reverse="lang.locale =='ar'"
                                      :value="strToJson(setting,lang.locale)" outlined></v-textarea> 
                        </div> 
                        <div v-else-if="setting.type == 'file'">
                          <v-card hover rounded="circle" height="150" :img="url || $url.img('/images/avatars/avatar-1.png')" class="ma-auto" width="150" outlined flat @click="$refs.fileInput.click()">
                            <input accept="image/*" ref="fileInput" @change="onFileChange" type="file" class="d-none" label="" /> 
                          </v-card> 
                        </div>  
                      </v-col>
                    </template>
                  </v-row>
                </v-tab-item>
              </v-tabs>
            </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
    <v-card-actions> 
    </v-card-actions>
  </v-card> 
</template>

<script lang="ts">
var _ = require('lodash');
import {  Component, Vue, Watch } from "vue-property-decorator";
import Roles from "~/components/Roles/role.vue";
import { State } from 'vuex-class'
import { RootState } from '~/store'
import { ISettings } from "~/interfaces/settings";   
import dataLanguages from "~/data/languages"; 
import v from "~/data/validation";
interface ILanguage { title: string; img: string; locale: string; dir : string}
@Component({
  components : { Roles }
 })
export default class DashboardView extends Vue { 
  @State((state: RootState) => state.settings.settings) settings!: ISettings[]
  @State((state: RootState) => state.settings.isLoadin) isLoadin!: boolean
   languages: ILanguage[] = dataLanguages.map((language) => {
    return {
      title: language.name,
      img: language.icon,
      dir: language.direction,
      locale: language.locale
    }
  }) 
  v = v
  file : any
  url : any
  Settings : ISettings[] = []
  strToJson(stg : ISettings,lang :string){ 
    if (!stg.is_array) { 
      return JSON.parse(stg.values)['name_'+ lang]
    }
  }
   onFileChange(e :any) {
    this.file = e.target.files[0]; 
    this.url = URL.createObjectURL(this.file);
  } 
  mounted() {
    setTimeout(() => {
      this.Settings = JSON.parse(JSON.stringify(this.settings)) 
    }, 1000);
  }
  created() { 
    this.$store.dispatch('settings/getSettings') 
  }
}
</script>
