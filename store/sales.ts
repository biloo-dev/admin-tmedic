import { ActionTree, GetterTree, MutationTree } from "vuex";
import { ISales } from "~/interfaces/global"; 
export interface SalesState {
  sales: ISales[];
}

function getDefaultState(): SalesState {
  return {
    sales: [
      {
        country: "USA",
        flag:
          "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/US.png",
        salesInM: 2920
      },
      {
        country: "Germany",
        flag:
          "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/DE.png",
        salesInM: 1300
      },
      {
        country: "Australia",
        flag:
          "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/AU.png",
        salesInM: 760
      },
      {
        country: "United Kingdom",
        flag:
          "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/GB.png",
        salesInM: 690
      },
      {
        country: "Romania",
        flag:
          "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/RO.png",
        salesInM: 600
      },
      {
        country: "Brasil",
        flag:
          "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/BR.png",
        salesInM: 550
      }
    ]
  };
}
export const state = getDefaultState;

export const mutations: MutationTree<SalesState> = {
 
};

export const actions: ActionTree<SalesState, {}> = {
  
};

export const getters: GetterTree<SalesState, {}> = {
  sales(state): ISales[] {
    return state.sales;
  }
};
