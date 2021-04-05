export interface IItems { 
    icon: string; 
    title: string; 
    to: string 
}
 
export interface IDrawer {
  image: number | string ;
  gradient: number;
  mini: boolean;
}
export interface ISales {
  country: string;
  flag: string;
  salesInM: number;
}