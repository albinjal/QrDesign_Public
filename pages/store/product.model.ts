import {Timestamp} from 'rxjs';

export interface Product {
  colors: object;
  favoritecolor: string;
  name: string;
  relese?: Timestamp<any>;
  imgpath?: string;
  types: Types;
  typearray?: Array<string>;
  colorarray?: Array<string>;
  id?: string;
  popularity?: number;
  loaded?: boolean;
}


export interface Types {
  canvas?: Type;
  poster?: Type;
}

export interface Type {
  name: string;
  savedas: string;
  dimensions: object;
}
