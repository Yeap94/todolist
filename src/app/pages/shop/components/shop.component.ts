import * as angular from 'angular';
import { from } from 'core-js/fn/array';
import * as _ from 'underscore';
import { IProduct } from './../../../models/product.interface';
import { RandomizerService } from './../../../services/randomizer.service';
import { products } from './products';

export class ShopController {

    private randomIndex: number;
    private allProducts: Array<IProduct> = products;

    constructor (
        private $state: ng.ui.IStateService,
        private $scope: ng.IScope,
        private RandomService: RandomizerService
    ) {
        this.$scope.$watch(() => this.RandomService.getRandomIndex(),
            (newValue: number, oldValue: number) => {
                this.randomIndex = newValue;
            }
        );
        this.$scope.$watch(() => this.RandomService.getRandomDiscount(),
            (newValue: number, oldValue: number) => {
                _.forEach(this.allProducts, (product: IProduct) => {
                    product.priceChanged = false;
                });
                if (this.randomIndex !== undefined) {
                    this.allProducts[this.randomIndex].priceChanged = true;
                    this.allProducts[this.randomIndex].discountPrice = this.allProducts[this.randomIndex].price * newValue;
                }
            }
        );
    }

    public goCart = () => {
        this.$state.go('cart');
    }

    public backHome = () => {
        this.$state.go('homepage');
    }
}

export class Shop implements angular.IComponentOptions {
    public static selector = 'shoppage';
    public static controller = ShopController;
    public static controllerAs = 'vm';
    public static template = require('./shop.component.html');
}
