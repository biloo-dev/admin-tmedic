<template>
  <v-list
    expand
    nav
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(item, i) in items">
      <default-list-group
        v-if="item.items"
        :key="`group-${i}`"
        :item="item"
      />

      <default-list-item
        v-else
        :key="`item-${i}`"
        :item="item"
      />
    </template>
  </v-list>
</template>


<script lang="ts">
 import { Component, Vue ,Prop } from 'vue-property-decorator'
 import DefaultListGroup from "~/components/layouts/ListGroup.vue";
 import DefaultListItem from "~/components/layouts/ListItem.vue";
  @Component({
    components: { DefaultListGroup, DefaultListItem, }
  })
  export default class DefaultList extends Vue {
     @Prop({ type: Array, default: () => ([]) }) items : any
  } 
</script>
  
