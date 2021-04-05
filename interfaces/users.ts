export interface IUsers {
  id?: number;
  username: string;
  firstName_fr: string;
  firstName_en: string;
  firstName_ar: string;
  lastName_fr: string;
  lastName_en: string;
  lastName_ar: string;
  sexe: number;
  type: number;
  phone1: string;
  phone2: string;
  img: string;
  email: string;
  password?: string;
  roles: IRoles[] | [];
  permissions: IPermissions[] | [];
}

export interface IRoles {
  id?: number;
  slug: string;
  name_fr: string;
  name_ar: string;
  name_en: string;
  description_fr: string;
  description_ar: string;
  description_en: string;
  permissions: IPermissions[];
}
export interface IPermissions {
  id?: number;
  slug: string;
  name_fr: string;
  name_ar: string;
  name_en: string;
  description_fr: string;
  description_ar: string;
  description_en: string;
  permissions: IPermissions;
}