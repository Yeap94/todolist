import * as angular from 'angular';
import { ICartProduct } from './../../../models/cartproduct.interface';
import * as _ from 'underscore';
import { IProduct } from './../../../models/product.interface';
import { RandomizerService } from './../../../services/randomizer.service';
import { products } from './products';
import { cartProducts } from './../../cart/components/cartproucts';
import { CalcTotalService } from './../../../services/calctotal.service';
import { FindMinimalPriceService } from './../../../services/findminimal.service';
import { min } from 'underscore';


export class ShopController {

    private randomIndex: number;
    private allProducts: Array<IProduct> = products;
    private filteredProducts: Array<IProduct> = [];
    private minPrice: number;
    private maxPrice: number;
    private cartProducts: Array<ICartProduct> = cartProducts;
    private timeout: angular.IPromise<void>;

    constructor (
        private $rootScope: ng.IRootScopeService,
        private RandomService: RandomizerService,
        private CalcTotalService: CalcTotalService,
        private FindMinimalPriceService: FindMinimalPriceService,
        private $timeout: ng.ITimeoutService
    ) {

    }

    public init = (): void => {
        this.$rootScope.$watch(() => this.RandomService.getRandomIndex(),
            (newValue: number, oldValue: number) => {
                this.randomIndex = newValue;
            }
        );
        this.$rootScope.$watch(() => this.RandomService.getRandomDiscount(),
            (newValue: number, oldValue: number) => {
                _.forEach(this.allProducts, (product: IProduct) => {
                    product.priceChanged = false;
                    product.discountPrice = product.price;
                });
                if (this.randomIndex !== undefined) {
                    this.allProducts[this.randomIndex].priceChanged = true;
                    this.allProducts[this.randomIndex].discountPrice = this.allProducts[this.randomIndex].price * newValue;
                    this.FindMinimalPriceService.compare(this.allProducts[this.randomIndex]);
                }
            }
        );
    }

    public addToCart = (index: number) => {
        this.beautify(index);
        let productInCart: ICartProduct = _.find(this.cartProducts, (cartProduct: ICartProduct) => cartProduct.name === this.allProducts[index].name);
        if (productInCart !== undefined) {
            let productInCartIndex = this.cartProducts.indexOf(productInCart);
            this.cartProducts[productInCartIndex].price += this.allProducts[index].discountPrice;
            this.cartProducts[productInCartIndex].count++;
        } else {
            this.cartProducts.push({
                name: this.allProducts[index].name,
                price: this.allProducts[index].discountPrice,
                count: 1
            });
        }
        this.allProducts[index].added = true;
        this.CalcTotalService.calcTotals();
    }

    private beautify = (index: number): void => {
        this.$timeout.cancel(this.timeout);
        angular.element(document.getElementById(`counter-${index}`)).addClass('time');
        this.timeout = this.$timeout(() => {
            angular.element(document.getElementById(`counter-${index}`)).removeClass('time');
        }, 1000);
    }

    private findProductForPrice = (): void => {
        this.allProducts = products;
        this.filteredProducts = [];
        _.each(this.allProducts, (each: IProduct) => {
            if (each.price >= this.minPrice && each.price <= this.maxPrice) {
                this.filteredProducts.push({
                    name: each.name,
                    price: each.price,
                    discountPrice: each.discountPrice,
                    priceChanged: each.priceChanged,
                    added: each.added
                });
            }
        });
        this.allProducts = this.filteredProducts;
    }

    private cancelFilters = (): void => {
        this.allProducts = products;
        this.filteredProducts = [];
    }
}

export class Shop implements angular.IComponentOptions {
    public static selector = 'shoppage';
    public static controller = ShopController;
    public static controllerAs = 'vm';
    public static template = require('./shop.component.html');
}
