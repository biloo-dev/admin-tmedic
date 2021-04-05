 <template>  
    <v-list-item @mouseenter="hover = true" @mouseleave="hover = false" :to="to ? to : ''"  @click="setLocale(item.locale,item.dir)"
          :class="{
            'black--text': !hover,
            'white--text secondary elevation-12': hover,
          }">
 
          <v-list-item-avatar  v-if="item.img"> 
            <v-img width="20px"  :src="item.img"></v-img>
          </v-list-item-avatar>
          <v-list-item-icon  v-if="item.icon"> 
             <v-icon>{{ item.icon }}</v-icon> 
          </v-list-item-icon>
          <v-list-item-title v-text="item.title" />
          <v-list-item-icon>
          <v-icon v-if="item.locale == $i18n.locale" color="pink" >
            mdi-check
          </v-icon>
        </v-list-item-icon>
  </v-list-item> 
</template>
<script lang="ts">  
  import { Vue, Component, Prop } from 'vue-property-decorator' 
  
  @Component
  export default class AppBarItem extends Vue {  
    @Prop({ type: Object, default: () => ({}) }) item! : Object
    @Prop({ type: String, default: () => "/" }) to! : string
    hover : boolean = false
    setLocale(locale : string,dir:string){
      if (this.to === "false") { 
        this.$emit('logout')
      }else{
        this.$emit('setLocale',{locale,dir})
      }
    }
    created(){ 
    }
  }

</script>
 