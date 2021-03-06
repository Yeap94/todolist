import * as angular from 'angular';
import * as _ from 'underscore';
import { CalcTotalService } from './../../../services/calctotal.service';
import { cartProducts } from './cartproucts';
import { ICartProduct } from '../../../models/cartproduct';
import { IDifferentPrices } from '../../../models/prices';

class CartController {
    private cartProducts: Array<ICartProduct> = cartProducts;
    constructor (
        private CalcTotalService: CalcTotalService
    ) {
        this.CalcTotalService.calcTotals();
    }
    public dleteOneProduct = (differentPrice: IDifferentPrices, product: ICartProduct): void => {
        if (differentPrice.count > 1) {
            differentPrice.count--;
        } else if (product.differentPrices.length === 1) {
            this.CalcTotalService.deleteFromCart(_.indexOf(this.cartProducts, product));
        } else {
            product.differentPrices.splice(_.findIndex(product.differentPrices, differentPrice), 1);
        }
        this.CalcTotalService.calcTotals();
    }

    public addOne = (differentPrice: IDifferentPrices): void => {
        differentPrice.count++;
        this.CalcTotalService.calcTotals();
    }
}

export class Cart implements angular.IComponentOptions {
    public static selector = 'cart';
    public static controller = CartController;
    public static controllerAs = 'vm';
    public static template = require('./cart.component.html');
}
