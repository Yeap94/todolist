import * as angular from 'angular';
import { IProduct } from '../../../models/product.interface';
class ShopController {
    private discount: number;
    private allProducts: Array<IProduct> = [
        {
            name: 'Ball',
            price: 145
        },
        {
            name: 'Chair',
            price: 4587
        },
        {
            name: 'Computer',
            price: 20567
        }
    ];
    constructor (
        private $state: ng.ui.IStateService,
        private $timeout: ng.ITimeoutService,
        private $interval: ng.IIntervalService
    ) {

    }
    public goCart = () => {
        this.$state.go('cart');
    }
    /**
     * @description генерирует случайное число от 0.01 до 0.99 - проценты скидки. floor - округляет число в меньшую сторону, random получает рандомное число от 0 до 1
     */
    public generateRandomDiscount = () => {
        this.discount = (Math.floor(Math.random() * 100) + 1) / 100;
        console.log('discount: ', this.discount);
    }
    /**
     * @description timeout для теста функции, потому что interval постоянно домножает НОВУЮ цену на скидку. Timeout позже заменить на интервал
     */
    public goDiscount = () => {
        this.$timeout(() => {
            this.generateRandomDiscount();
            for (let i = 0; i < 3; i++) {
                let oldPrice = this.allProducts[i].price ;
                this.allProducts[i].price = oldPrice * (1 - this.discount);
                console.log('Prices: ', this.allProducts[i].price);
            }
        }, 1000);
    }
}
export class Shop implements angular.IComponentOptions {
    public static selector = 'shoppage';
    public static controller = ShopController;
    public static controllerAs = 'vm';
    public static template = require('./shop.component.html');
}
