import * as angular from 'angular';
import { CalcTotalService } from './../../../services/calctotal.service';

class CartController {
    constructor (
        private CalcTotalService: CalcTotalService
    ) {
        this.CalcTotalService.calcTotals();
    }
}

export class Cart implements angular.IComponentOptions {
    public static selector = 'cart';
    public static controller = CartController;
    public static controllerAs = 'vm';
    public static template = require('./cart.component.html');
}
