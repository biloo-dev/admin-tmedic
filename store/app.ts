import { ActionTree, GetterTree, MutationTree } from "vuex";
import { IItems } from "~/interfaces/global";

export interface AppState {
  drawer: boolean | null;
  drawerImage: boolean;
  mini: boolean;
  items: IItems[];
}

function getDefaultState(): AppState {
  return {
    drawer: null,
    drawerImage: true,
    mini: false,
    items: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        to: "/"
      }, 
      {
        title: "UsersManager",
        icon: "mdi-account-group-outline",
        to: "/users"
      },
      {
        title: "SettingsManager",
        icon: "mdi-cog-outline",
        to: "/settings"
      },
       
    ]
  };
}
export const state = getDefaultState;

export const mutations: MutationTree<AppState> = {
  drawer(state,pay :boolean){
    state.drawer = pay
  },
  mini(state,pay :boolean){
    state.mini = pay
  },
  drawerImage(state,pay :boolean){
    state.drawerImage = pay;
  }
};

export const actions: ActionTree<AppState, {}> = {};

export const getters: GetterTree<AppState, {}> = {};
