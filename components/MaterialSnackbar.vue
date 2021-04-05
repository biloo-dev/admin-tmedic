<template>
  <v-snackbar
    v-model="internalValue"
    class="v-snackbar--material"
    v-bind="{
      ...$attrs,
      'color': 'transparent'
    }"
  >
    <material-alert
      v-model="internalValue"
      :color="$attrs.color"
      :dismissible="dismissible"
      :type="type"
      class="ma-0"
      dark
    >
      <slot />
    </material-alert>
  </v-snackbar>
</template>
<script lang="ts">  
  import { Component, Vue ,Prop,Watch } from 'vue-property-decorator'
  @Component 
  export default class MaterialSnackbar extends Vue {
    @Prop({ type: Boolean, default: () => true }) dismissible! : Boolean
    @Prop({ type: String, default: () => "" }) type! : String
    @Prop({ type: Boolean }) value! : Boolean 
    internalValue : Boolean = this.value 
   
    @Watch('value') 
    onInternalValueChange (val : any, oldVal : any) {
      if (val === oldVal) return

      this.$emit('input', val)
    }
    @Watch('internalValue') 
    onValueChange (val : any, oldVal : any) {
      if (val === oldVal) return

      this.internalValue = val
    }
  }
</script>
 

<style lang="sass">
  .v-snackbar--material
    margin-top: 32px
    margin-bottom: 32px

    .v-alert
      padding: 32px 16px

    .v-alert--material,
    .v-snack__wrapper
      border-radius: 4px

    .v-snack__content
      overflow: visible
      padding: 0

    .v-snack__action
      display: none
</style>
