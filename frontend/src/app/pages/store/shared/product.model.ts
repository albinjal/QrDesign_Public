
export interface Product {
  colors?: object;
  favoritecolor?: string;
  discount?: number;
  name?: string;
  imgpath?: string;
  types?: Types;
  typearray?: string[];
  colorarray?: string[];
  id?: string;
  popularity?: number;
  load?: boolean;
  cheapest?: number;
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

