import { Context } from "@nuxt/types";
import Vue from "vue";
Vue.use(require('vue-chartist'))
let lineSmooth = Vue.chartist.Interpolation.cardinal({
  tension: 0
});
 
 