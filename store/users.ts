import { ActionTree, GetterTree, MutationTree } from "vuex";
import { IUsers, IRoles ,IPermissions } from "~/interfaces/users"; 
import api from "~/api/users"; 

export interface UsersState {
  Users: IUsers[] | [];
  roles: IRoles[] | [];
  permissions: IPermissions[] | [];
  isLoadin: boolean;
}
interface RolePerm {
  roles : IRoles[];
  permissions : IPermissions[];
}

interface PermMod {
  perm : string[];
  model : string[];
}
function getDefaultState(): UsersState {
  return {
    Users: [],
    roles: [],
    permissions: [],
    isLoadin: true
  };
}
export const state = getDefaultState;

export const mutations: MutationTree<UsersState> = {
  async getUsers(state, payload: IUsers[]): Promise<void> {
    state.Users = payload;
    state.isLoadin = false;
  },
  async getRoles(state, payload: RolePerm): Promise<void> {
    state.roles = payload.roles;
    state.permissions = payload.permissions;
    state.isLoadin = false;
  }
};


export const actions: ActionTree<UsersState, {}> = {
  async getUsers({ commit }): Promise<void> {
    try {
      let request: Promise<IUsers[]>;
      request = api.getUsers();
      const user = await request;
      commit("getUsers", user);
    } catch (err) {
      console.log("err :>> ", err);
    }
  },
  async setUser({ dispatch }, payload: IUsers[]): Promise<void> {
    try {
      let request: Promise<boolean>;
      request = api.setUser(payload);
      const user = await request;
      dispatch("getUsers");
    } catch (err) {
      console.log("err :>> ", err);
    }
  },
  async updateUser({ dispatch }, payload: IUsers[]): Promise<void> {
    try {
      let request: Promise<boolean>;
      request = api.updateUser(payload);
      const user = await request;
      dispatch("getUsers");
    } catch (err) {
      console.log("err :>> ", err);
    }
  },
  async deleteUser({ dispatch }, payload: number): Promise<void> {
    try {
      let request: Promise<boolean>;
      request = api.deleteUser(payload);
      const user = await request;
      dispatch("getUsers");
    } catch (err) {
      console.log("err :>> ", err);
    }
  },
  async getRoles({ commit }): Promise<void> {
    try {
      let request: Promise<RolePerm[]>;
      request = api.getRoles();
      const roles = await request;
      commit("getRoles", roles);
    } catch (err) {
      console.log("err :>> ", err);
    }
  },
  async setRole({ dispatch }, payload: IRoles[]): Promise<any> {
    try {
      let request: Promise<boolean>;
      request = api.setRole(payload);
      const chk = await request;
      if (chk) {
        this.app.$url.success("successfully saved Role")
      }
      dispatch("getRoles");
      dispatch("getUsers");
      return chk;
    } catch (err) {
      console.log("err :>> ", err);
    }
  },
  async updateRole({ dispatch }, payload: IRoles[]): Promise<any> {
    try {
      let request: Promise<boolean>;
      request = api.updateRole(payload);
      const chk = await request;
      if (chk) {
        this.app.$url.success("successfully Update Role")
      }
      dispatch("getRoles");
      dispatch("getUsers");
      return chk;
    } catch (err) {
      console.log("err :>> ", err);
    }
  },
  async deleteRole({ dispatch }, payload: number): Promise<any> {
    try {
      let request: Promise<boolean>;
      request = api.deleteRole(payload);
      const chk = await request;
      if (chk) {
        this.app.$url.success("successfully Delete Role")
      }
      dispatch("getRoles");
      dispatch("getUsers");
      return chk;
    } catch (err) {
      console.log("err :>> ", err);
    }
  }
};

export const getters: GetterTree<UsersState, {}> = {
    Users(state): IUsers[] {
      return state.Users;
    }, 
  };
