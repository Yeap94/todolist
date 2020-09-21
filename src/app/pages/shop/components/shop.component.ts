import * as angular from 'angular';
import { ICartProduct } from './../../../models/cartproduct.interface';
import * as _ from 'underscore';
import { IProduct } from './../../../models/product.interface';
import { RandomizerService } from './../../../services/randomizer.service';
import { products } from './products';
import { cartProducts } from './../../cart/components/cartproucts';

export class ShopController {

    private randomIndex: number;
    private allProducts: Array<IProduct> = products;
    private cartProducts: Array<ICartProduct> = cartProducts;

    constructor (
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
                    product.discountPrice = product.price;
                });
                if (this.randomIndex !== undefined) {
                    this.allProducts[this.randomIndex].priceChanged = true;
                    this.allProducts[this.randomIndex].discountPrice = this.allProducts[this.randomIndex].price * newValue;
                }
            }
        );
    }
    public addToCart = (index: number) => {
        let productInCart: ICartProduct = _.find(this.cartProducts, (cartProduct: ICartProduct) => cartProduct.name === this.allProducts[index].name);
        if (productInCart !== undefined) {
            let productInCartIndex = this.cartProducts.indexOf(productInCart);
            this.cartProducts[productInCartIndex].price += this.allProducts[index].price;
            this.cartProducts[productInCartIndex].count++;
            console.log('Cart products', this.cartProducts);
            this.RandomService.calcCartCount();
        } else {
            this.cartProducts.push({
                name: this.allProducts[index].name,
                price: this.allProducts[index].discountPrice,
                count: 1
            });
            this.RandomService.calcCartCount();
        }
    }
}

export class Shop implements angular.IComponentOptions {
    public static selector = 'shoppage';
    public static controller = ShopController;
    public static controllerAs = 'vm';
    public static template = require('./shop.component.html');
}
