import { $axios } from "~/util/api";
import { ISettings } from "~/interfaces/settings";

 
const api = {
  getSettings: async (): Promise<ISettings[]> => {
    let data = $axios.$post("/settings");
    return data;
  }, 

  setSetting: async (form: ISettings[]): Promise<boolean> => {
    let data = $axios.$post("/settings/store", form);
    return data;
  },

  updateSetting: async (form: ISettings[]): Promise<boolean> => {
    let data = $axios.$post("/settings/update", form);
    return data;
  },

  deleteSetting: async (id: number): Promise<boolean> => {
    let data = $axios.$post("/settings/delete", { id });
    return data;
  },
 
};

export default api;
