import * as _ from 'underscore';
import { IProduct } from '../models/product.interface';
import { products } from './../pages/shop/components/products';
import { FindMinimalPriceService } from './findminimal.service';

export class RandomizerService {
    public static selector = 'RandomService';

    private isRandomizeStart: boolean = false;
    // private allProducts: Array<IProduct> = products;
    private goDiscountStart: boolean = false;


    constructor (
        private $interval: ng.IIntervalService,
        private FindMinimalPriceService: FindMinimalPriceService
    ) {
        this.randomize();
    }

    public randomize = (): void => {
        if (!this.isRandomizeStart) {
            this.isRandomizeStart = true;
            this.$interval(() => {
                let rndIdx: number = Math.floor(Math.random() * products.length);
                let rndDisc: number = (Math.floor(Math.random() * 100) + 1) / 100;
                this.goDiscount(rndIdx, rndDisc);
            }, 10000);
        }
    }

    public getIsRandomizeStart = (): boolean => {
        return this.isRandomizeStart;
    }

    public getIsGoDiscountStart = (): boolean => {
        return this.goDiscountStart;
    }

    private goDiscount = (index: number, discount: number): void => {
        _.forEach(products, (product: IProduct) => {
            product.priceChanged = false;
            product.discountPrice = product.price;
        });
        products[index].priceChanged = true;
        products[index].discountPrice = products[index].price * discount;
        this.FindMinimalPriceService.compare(products[index]);
        this.goDiscountStart = !this.goDiscountStart;
    }
}
