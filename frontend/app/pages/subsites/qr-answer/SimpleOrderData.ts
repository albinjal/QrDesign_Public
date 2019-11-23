import {CartItem} from '../../../core/cart.model';
import {Product} from '../../store/shared/product.model';

export interface SimpleOrderData {
  firstName: string;
  lastName: string;
  orders: (CartItem & Product)[];
}
