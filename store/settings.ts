import { ActionTree, GetterTree, MutationTree } from "vuex";
import { ISettings } from "~/interfaces/settings";
import api from "~/api/settings"; 
export interface SettingsState {
  settings: ISettings[] | [];
  isLoadin: boolean;
}
function getDefaultState(): SettingsState {
  return {
    settings: [], 
    isLoadin: true
  };
}
export const state = getDefaultState;

export const mutations: MutationTree<SettingsState> = {
  async getSettings(state, payload: ISettings[]): Promise<void> {
    state.settings = payload;
    state.isLoadin = false;
  }, 
};

export const actions: ActionTree<SettingsState, {}> = {
  async getSettings({ commit }): Promise<void> {
    try {
      let request: Promise<ISettings[]>;
      request = api.getSettings();
      const user = await request;
      commit("getSettings", user);
    } catch (err) {
      console.log("err :>> ", err);
    }
  },
  async setSetting({ dispatch }, payload: ISettings[]): Promise<void> {
    try {
      let request: Promise<boolean>;
      request = api.setSetting(payload);
      const user = await request;
      dispatch("getSettings");
    } catch (err) {
      console.log("err :>> ", err);
    }
  },
  async updateSetting({ dispatch }, payload: ISettings[]): Promise<void> {
    try {
      let request: Promise<boolean>;
      request = api.updateSetting(payload);
      const user = await request;
      dispatch("getSettings");
    } catch (err) {
      console.log("err :>> ", err);
    }
  },
  async deleteSetting({ dispatch }, payload: number): Promise<void> {
    try {
      let request: Promise<boolean>;
      request = api.deleteSetting(payload);
      const user = await request;
      dispatch("getSettings");
    } catch (err) {
      console.log("err :>> ", err);
    }
  }, 
};

export const getters: GetterTree<SettingsState, {}> = {
  
};