<template>
  <section class="mb-12 text-center">
    <h1
      class="mb-2 text-h3"
      v-text="heading"
    />

    <div
      v-if="link"
      class="text-body-2 font-weight-light"
    >
      Please checkout the <a
        :href="`https://vuetifyjs.com/en/${link}`"
        class="text-decoration-none secondary--text"
        target="_blank"
      >full documentation</a>
    </div>

    <v-responsive
      class="text-center mx-auto text-body-1 font-weight-light"
      max-width="400"
    >
      <slot />
    </v-responsive>
  </section>
</template>
<script lang="ts">  
  import { Component, Vue ,Prop } from 'vue-property-decorator'
  @Component 
  export default class ViewIntro extends Vue {
    @Prop({ type: String, default: () => "" }) heading! : String 
    @Prop({ type: String, default: () => "" }) link! : String 
  }
</script>
 
