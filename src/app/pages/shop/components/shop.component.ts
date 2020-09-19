import * as angular from 'angular';
import { IProduct } from '../../../models/product.interface';
import { RandomizerService } from '../../../services/randomizer.service';
class ShopController {
    private randomIndex: number;
    private randomDiscount: number;
    private allProducts: Array<IProduct> = [
        {
            name: 'Ball',
            price: 145,
            discountPrice: 145,
            priceChanged: false
        },
        {
            name: 'Chair',
            price: 4587,
            discountPrice: 4587,
            priceChanged: false
        },
        {
            name: 'Computer',
            price: 20567,
            discountPrice: 20567,
            priceChanged: false
        },
        {
            name: 'Book',
            price: 425,
            discountPrice: 425,
            priceChanged: false
        },
        {
            name: 'Phone',
            price: 784,
            discountPrice: 784,
            priceChanged: false
        },
        {
            name: 'House',
            price: 251360,
            discountPrice: 251360,
            priceChanged: false
        },
        {
            name: 'TV',
            price: 1300,
            discountPrice: 1300,
            priceChanged: false
        }
    ];

    constructor (
        private $state: ng.ui.IStateService,
        private $timeout: ng.ITimeoutService,
        private $interval: ng.IIntervalService,
        private $scope: ng.IScope,
        private randomService: RandomizerService
    ) {
        this.$scope.$watch(() => {
            return this.randomService.getRandomIndex();
        }, (newValue, oldValue) => {
            this.randomIndex = newValue;
        });
        this.$scope.$watch(() => {
            return this.randomService.getRandomDiscount();
        }, (newValue, oldValue) => {
            for (let i = 0; i < this.allProducts.length; i++) {
                this.allProducts[i].priceChanged = false;
            }
            this.allProducts[this.randomIndex].priceChanged = true;
            this.allProducts[this.randomIndex].discountPrice = this.allProducts[this.randomIndex].price * newValue;
        });
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
