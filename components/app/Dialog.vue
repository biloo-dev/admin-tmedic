<style scoped>

.border-color-red {
  border: 1px solid #f8bb86;
}
</style>
<template>
<v-row justify="center">
  <v-dialog v-model="dialog" persistent max-width="290"> 
    <v-card>
      <v-card-title >
        <v-spacer></v-spacer>
         <v-icon color="#f8bb86" size="60" class=" border-color-red rounded-circle">mdi-exclamation-thick</v-icon>
        <v-spacer></v-spacer>
        
      </v-card-title>
      <v-card-text class="py-4 text-center">
        <h2>{{ $t("general."+item.title) }}</h2>
        <h4>{{ $t("general."+item.text) }}</h4>
      </v-card-text>
          <v-divider
            class=""
          ></v-divider>
      <v-card-actions>
        <v-btn color="green darken-1" text @click="dialog = false">
          {{ $t('general.no') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          {{ $t('general.yes') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class AppBarItem extends Vue {
    @Prop({
      type: Object,
      default: () => ({})
    }) item!: Object
    @Prop({
      type: Boolean,
      default: () => false
    }) dialog!: boolean

    yes(locale: string, dir: string) {
      this.$emit('yes', {
        locale,
        dir
      })
    }
  }
</script>
