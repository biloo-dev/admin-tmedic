<template>
  <v-app>
    <default-bar />

    <default-drawer /> 
    <!-- <default-view /> -->
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <default-footer />

    <default-settings />
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DefaultBar from "~/components/layouts/AppBar.vue";
import DefaultDrawer from "~/components/layouts/Drawer.vue";
import DefaultFooter from "~/components/layouts/Footer.vue";
import DefaultSettings from "~/components/layouts/Settings.vue";
import DefaultView from "~/components/layouts/View.vue";
import { IItems } from "~/interfaces/global";
@Component({
  components: {
    DefaultBar,
    DefaultDrawer,
    DefaultFooter,
    DefaultSettings,
    DefaultView
  },
  head(this: DefautLayout) {
    return {
      bodyAttrs: {
        class: this.bodyClasses
      }
    };
  }
})
export default class DefautLayout extends Vue {
  clipped: boolean = false;
  drawer: boolean = false;
  fixed: boolean = false;
  items: IItems[] = [
    {
      icon: "mdi-apps",
      title: "Welcome",
      to: "/"
    },
    {
      icon: "mdi-chart-bubble",
      title: "Inspire",
      to: "/inspire"
    }
  ];
  miniVariant: boolean = false;
  right: boolean = true;
  rightDrawer: boolean = false;
  title: string = "Vuetify.js";
  baseBodyClasses = ["disable-transitions"];
  async mounted() {
    await this.$nextTick();

    this.baseBodyClasses = [];
  }
  get bodyClasses(): string[] {
    return [...this.baseBodyClasses, `locale-${this.$i18n.locale}`];
  }
}
</script>
