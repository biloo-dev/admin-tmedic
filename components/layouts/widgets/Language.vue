<template>
  <v-menu
    bottom
    left :close-on-content-click="false"
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>

    <v-list :tile="false" flat dense nav > 
      <template v-for="(item, i) in languages" > 
        <app-bar-item :key="`item-${i}`" :item="item" @setLocale="setLocale"></app-bar-item>
      </template> 
    </v-list>
  </v-menu>
</template>
<script lang="ts">  
  import { Component, Vue } from 'vue-property-decorator'
  import dataLanguages from "~/data/languages";
  import { Getter } from 'vuex-class' 
  interface ILanguage {
    title : string;
    img : string;
    locale : string;
  }
  @Component  
  export default class DefaultAccount extends Vue {
    @Getter('locale/language') language!: ILanguage
    selectedItem : number | null = null
    languages :ILanguage[] = dataLanguages.map((language) => {
    return {
      title: language.name,
      img: language.icon,
      dir: language.direction,
      locale: language.locale
    }
  })
  
    setLocale({locale,dir}:{locale : string,dir :string}){
      const fullPath = this.$route.fullPath  
      const re = new RegExp('^/(' + dataLanguages.map(x => x.locale).join('|') + ')(/|$)')
      const path = fullPath.replace(re, '/')
      this.$router.push(`/${locale}${path}`)
      this.$vuetify.rtl = dir === "rtl"
    }
    created(){  
    }
 
  }
</script>
