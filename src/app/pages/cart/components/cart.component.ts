import * as angular from 'angular';
import * as _ from 'underscore';
import { ICartProduct } from './../../../models/cartproduct.interface';
import { cartProducts } from './../../cart/components/cartproucts';
import { RandomizerService } from './../../../services/randomizer.service';

class CartController {
    private cartProducts: Array<ICartProduct> = cartProducts;
    constructor (
        private RandomService: RandomizerService
    ) {
    }

    public deleteFromCart = (index: number) => {
        this.cartProducts.splice(index, 1);
        this.RandomService.calcCartCount();
    }

    public clearCart = () => {
        this.cartProducts.splice(0, this.cartProducts.length);
        this.RandomService.getcalcCartCount();
    }
}

export class Cart implements angular.IComponentOptions {
    public static selector = 'cart';
    public static controller = CartController;
    public static controllerAs = 'vm';
    public static template = require('./cart.component.html');
}
