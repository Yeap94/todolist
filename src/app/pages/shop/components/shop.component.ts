import * as angular from 'angular';
import { ICartProduct } from './../../../models/cartproduct.interface';
import * as _ from 'underscore';
import { IProduct } from './../../../models/product.interface';
import { RandomizerService } from './../../../services/randomizer.service';
import { products } from './products';
import { cartProducts } from './../../cart/components/cartproucts';
import { CalcTotalService } from './../../../services/calctotal.service';
import { IShopFilter } from '../../../models/shop-filter';


export class ShopController {

    private allProducts: Array<IProduct> = products;
    private filteredProducts: Array<IProduct> = [];
    private cartProducts: Array<ICartProduct> = cartProducts;
    private timeout: ng.IPromise<void>;
    private shopFilter: IShopFilter;

    constructor (
        private $scope: ng.IScope,
        private RandomService: RandomizerService,
        private CalcTotalService: CalcTotalService,
        private $timeout: ng.ITimeoutService
    ) {
        this.filteredProducts = this.allProducts;
        this.shopFilter = {
            name: '',
            minPrice: null,
            maxPrice: null,
            isDiscount: false
        };

        this.$scope.$watch(() => this.RandomService.getIsGoDiscountStart(), (newValue: boolean, oldValue: boolean) => {
            this.applyFilter();
        });
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

    private transformPrice = (price: string): string => {
        return price ? price.replace(/[^0-9]/g, '') : '';
    }

    private applyFilter = () => {
        this.shopFilter.minPrice = this.transformPrice(this.shopFilter.minPrice);
        this.shopFilter.maxPrice = this.transformPrice(this.shopFilter.maxPrice);
        let max = <IProduct>_.max(this.allProducts, (product: IProduct) => product.discountPrice);
        this.filteredProducts = _.filter(this.allProducts, (product: IProduct) => {
            return  product.discountPrice >= (+this.shopFilter.minPrice || 0) &&
                    product.discountPrice <= (+this.shopFilter.maxPrice || max.discountPrice);
        });
    }
}

export class Shop implements angular.IComponentOptions {
    public static selector = 'shoppage';
    public static controller = ShopController;
    public static controllerAs = 'vm';
    public static template = require('./shop.component.html');
}
