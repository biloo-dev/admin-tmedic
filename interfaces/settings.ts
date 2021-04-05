export interface ISettings {
  id?: number;
  slug: string;
  name_fr: string;
  name_ar: string;
  name_en: string;
  description_fr: string;
  description_ar: string;
  description_en: string;
  type: string;
  values: string;
  with_lang : boolean;
  is_array : boolean;
}
