import * as _ from 'underscore';
import { products } from './../pages/shop/components/products';

export class RandomizerService {

    public static selector = 'RandomService';
    private randomIndex: number;
    private randomDiscount: number;
    private isRandomizeStart: boolean = false;
    private productsLength: number = products.length;


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
}
