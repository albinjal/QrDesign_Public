export interface NewProdForm {
  id: string;
  popularity: number;
  name: string;
  visable: boolean;
  colors: ColorForm[];
  favorite_color: string;
}

export interface ColorForm {
  col_id: string;
  col_name: string;
  canvas_img_url: string;
  poster_img_url: string;
}
