import { ActionTree, GetterTree, MutationTree } from "vuex";
import { IDrawer } from "~/interfaces/global";
import { IN_BROWSER } from "~/util/globals";
export interface UserState {
  dark: boolean;
  drawer: IDrawer;
  gradients: string[];
  images: string[];
  notifications: string[];
  rtl: boolean;
}

function getDefaultState(): UserState {
  return {
    drawer: {
      image: 0,
      gradient: 0,
      mini: false
    },
    dark: false,
    gradients: [
      "rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)",
      "rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)",
      "rgba(244, 67, 54, .8), rgba(244, 67, 54, .8)"
    ],
    images: [
      "https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg",
      "https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-2.jpg",
      "https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-3.jpg",
      "https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-4.jpg"
    ],
    notifications: [],
    rtl: false
  };
}
export const state = getDefaultState;

export const mutations: MutationTree<UserState> = {
  get_drawer(state, payload: IDrawer) {
    state.drawer = payload;
  },
  get_dark(state, payload: boolean) {
    state.dark = payload;
  },
  gradient(state, payload: number) {
    state.drawer.gradient = payload;
  },
  image(state, payload: number) {
    state.drawer.image = payload;
  },
  get_notifications(state, payload: string[]) {
    state.notifications = payload;
  },
  get_rtl(state, payload: boolean) {
    state.rtl = payload;
  }
};

export const actions: ActionTree<UserState, {}> = {
  fetch: ({ commit }) => {
    const local = localStorage.getItem("vuetify@user") || "{}";
    const user = JSON.parse(local);

    for (const key in user) {
      commit("get_" + key, user[key]);
    }

    if (user.dark === undefined) {
      commit("dark", window.matchMedia("(prefers-color-scheme: dark)"));
    }
  },
  update: ({ state }) => {
    if (!IN_BROWSER) return;

    localStorage.setItem("vuetify@user", JSON.stringify(state));
  }
};

export const getters: GetterTree<UserState, {}> = {
  dark: (state, getters) => {
    return state.dark || getters.gradient.indexOf("255, 255, 255") === -1;
  },
  gradient: state => {
    return state.gradients[state.drawer.gradient];
  },
  image: state => {
    return state.drawer.image === 0
      ? state.images[0]
      : state.images[+state.drawer.image];
  }
};
