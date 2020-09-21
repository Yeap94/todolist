import * as _ from 'underscore';
import { products } from './../pages/shop/components/products';
import { cartProducts } from './../pages/cart/components/cartproucts';
import { ICartProduct } from './../models/cartproduct.interface';

export class RandomizerService {

    public static selector = 'RandomService';
    private randomIndex: number;
    private randomDiscount: number;
    private isRandomizeStart: boolean = false;
    private productsLength: number = products.length;
    private cartProductsCount: number = 0;
    private cartProducts: Array<ICartProduct> = cartProducts;


    constructor (
        private $interval: ng.IIntervalService,
    ) {
        this.randomize();
    }

    public randomize = (): void => {
        if (!this.isRandomizeStart) {
            this.isRandomizeStart = true;
            this.$interval(() => {
                this.randomIndex = Math.floor(Math.random() * this.productsLength);
                this.randomDiscount = (Math.floor(Math.random() * 100) + 1) / 100;
            }, 1000);
        }
    }

    public getRandomIndex = (): number => {
        return this.randomIndex;
    }

    public getRandomDiscount = (): number => {
        return this.randomDiscount;
    }

    public getIsRandomizeStart = (): boolean => {
        return this.isRandomizeStart;
    }
    public calcCartCount = (): void => {
        this.cartProductsCount = _.reduce(this.cartProducts, (count: number, product: ICartProduct) => count + product.count, 0);
    }
    public getcalcCartCount = (): number => {
        this.cartProductsCount = 0;
        return this.cartProductsCount;
    }
}
