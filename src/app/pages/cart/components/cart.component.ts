import * as angular from 'angular';
import * as _ from 'underscore';
import { ICartProduct } from './../../../models/cartproduct.interface';
import { cartProducts } from './../../cart/components/cartproucts';
import { RandomizerService } from './../../../services/randomizer.service';

class CartController {
    private cartProducts: Array<ICartProduct> = cartProducts;
    private totalPrice: number = 0;
    private totalCount: number = 0;

    constructor () {
        this.calcTotals();
    }

    public deleteFromCart = (index: number) => {
        this.cartProducts.splice(index, 1);
        this.calcTotals();
    }

    public clearCart = () => {
        this.cartProducts.splice(0, this.cartProducts.length);
        this.calcTotals();
    }

    public calcTotals = (): void => {
        this.totalCount = this.calcTotalCount();
        this.totalPrice = this.calcTotalPrice();
    }

    public calcTotalCount = (): number => {
        return _.reduce(this.cartProducts, (count: number, product: ICartProduct) => count + product.count, 0);
    }

    public calcTotalPrice = (): number => {
        return _.reduce(this.cartProducts, (price: number, product: ICartProduct) => price + product.price, 0);
    }
}

export class Cart implements angular.IComponentOptions {
    public static selector = 'cart';
    public static controller = CartController;
    public static controllerAs = 'vm';
    public static template = require('./cart.component.html');
}
