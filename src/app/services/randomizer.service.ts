import * as _ from 'underscore';
import { IProduct } from '../models/product';
import { products } from './../pages/shop/components/products';
import { FindMinimalPriceService } from './findminimal.service';
/**
 * @description сервис для получения и присвоения рандомной скидке рандомному товару
 */
export class RandomizerService {
    public static selector = 'RandomService';

    private isRandomizeStart: boolean = false;
    private goDiscountStart: boolean = false;


    constructor (
        private $interval: ng.IIntervalService,
        private FindMinimalPriceService: FindMinimalPriceService
    ) {
        /**
         * @description запускаем функцию на моменте инициализаии сервиса.
         * Сервис инициализируется в core, поэтому рандомайзер работает, когда мы находимся на любой странице
         */
        this.randomize();
    }
    /**
     * @description функция каждый указанный интервал получает случайный индекс из диапазона 0 - длинна массива products
     * а также рандомную скидку из диапазона 0.1 - 0.99
     * isRandomizeStart - используется для определения состояния функции (start/stop), так как в функции есть интервал определение состояния важно, чтобы избежать наложения
     */
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
    /**
     * @description get-тер для isRandomizeStart
     */
    public getIsRandomizeStart = (): boolean => {
        return this.isRandomizeStart;
    }
    /**
     * @description get-тер для goDiscountStart
     */
    public getIsGoDiscountStart = (): boolean => {
        return this.goDiscountStart;
    }
    /**
     *
     * @param index - случайный индекс элемента массива products, полученный в randomize
     * @param discount - случайная скидка, полученная в randomize
     * @description функция сначала для каждого элемента products сбрасывает ключ priceChanged на false и discountPrice на price
     * для того, чтобы со скидкой был только один элемент и скидочные товары не накапливались
     * затем, для товара с индексом index цена умножается на скидку для получения discountPrice и для данного элемента вызывается compare для определения,
     * была ли скидка топовой или первой.
     * Также меняется значение ключа goDiscountStart, чтобы сработал watch-ер на странице shop для запуска фильтрации
     */
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
