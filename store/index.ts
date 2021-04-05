 
import { AppState } from "~/store/app";
import { UserState } from "~/store/user";
import { SalesState } from "~/store/sales";
import { UsersState } from "~/store/users";
import { SettingsState } from "~/store/settings";
 
export interface RootState {
  app: AppState;
  user: UserState;
  users: UsersState;
  sales: SalesState;
  settings: SettingsState;
}
