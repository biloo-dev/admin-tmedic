import { $axios } from "~/util/api";
import { IUsers, IRoles, IPermissions } from "~/interfaces/users";

interface RolePerm {
  roles: IRoles[];
  permissions: IPermissions[];
}
const api = {
  getUsers: async (): Promise<IUsers[]> => {
    let data = $axios.$post("/users");
    return data;
  },

  verifyEmail: async (email: string): Promise<IUsers[]> => {
    let data = $axios.$post("/users/verifyEmail", { email });
    return data;
  },

  setUser: async (form: IUsers[]): Promise<boolean> => {
    let data = $axios.$post("/users/store", form);
    return data;
  },

  updateUser: async (form: IUsers[]): Promise<boolean> => {
    let data = $axios.$post("/users/update", form);
    return data;
  },

  deleteUser: async (id: number): Promise<boolean> => {
    let data = $axios.$post("/users/delete", { id });
    return data;
  },
  getRoles: async (): Promise<RolePerm[]> => {
    let data = $axios.$post("/roles");
    return data;
  },
  setRole: async (form: IRoles[]): Promise<boolean> => {
    let data = $axios.$post("/roles/store", form);
    return data;
  },

  updateRole: async (form: IRoles[]): Promise<boolean> => {
    let data = $axios.$post("/roles/update", form);
    return data;
  },

  deleteRole: async (id: number): Promise<boolean> => {
    let data = $axios.$post("/roles/delete", { id });
    return data;
  }
};

export default api;
