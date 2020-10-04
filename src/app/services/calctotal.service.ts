import { cartProducts } from './../pages/cart/components/cartproucts';
import { ICartProduct } from './../models/cartproduct.interface';

export class CalcTotalService {
    public static selector = 'CalcTotalService';
    private cartProducts: Array<ICartProduct> = cartProducts;

}