import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../../pages/store/shared/product.model';

@Pipe({
  name: 'prodfilter',
  pure: true
})
export class ProdFilterPipe implements PipeTransform {

  transform(products: Product[], args?: FilterArgs): Product[] {
    if (!products) {
      return [];
    }
    products.map((prod) => {
      prod.imgpath = prod.colors[prod.favoritecolor].imgpath[args.type];
      return prod;
    });
    return products.filter(value => value.name.toLowerCase().includes(args.nameFilter.toLowerCase()));
  }

}

interface FilterArgs {
  nameFilter: string;
  sorting: string;
  category: string;
  type: string;
}
