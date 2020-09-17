import * as angular from 'angular';

class CartController {

}

export class Cart implements angular.IComponentOptions {
    public static selector = 'cart';
    public static controller = CartController;
    public static controllerAs = 'vm';
    public static template = require('./cart.component.html');
}
