import { IProduct } from '../models/product';
import { IMinimal } from '../models/minimal';
import { minimal } from './../pages/minimal-price/components/minimal';
import * as angular from 'angular';
import * as _ from 'underscore';
import * as moment from 'moment';
/**
 * @description сервис для добавления товаров с МИНИМАЛЬНОЙ ценой на отдельную страницу
 */
export class FindMinimalPriceService {
    public static selector = 'FindMinimalPriceService';
    public minimalPrices: Array<IMinimal> = minimal;
    public topMinimal: IMinimal;
    public counter: number = 0;
    /**
     *
     * @param product - продукт, на который сработала скидка (приходит из RandomizerService)
     * @description Функция используется в RandomizerService для того, чтобы выявить, является ли НОВАЯ скидочная цена минимальной для данного товара
     * Сначала выполняется поиск по массиву товаров с минимальными ценами товара, который пришел в функцию
     * Если товар найден, то находим индекс этого товара в массиве с минимальными ценами
     * Далее, если цена стала меньше той, которая уже есть в minimalPrices, то переписываем элемент в найденными индексом
     * counter - счетчик срабатывания goDiscount без топовых скидок
     * topMinimal - товар с САМОЙ топовой скидкой. Отображается над таблицей
     * иначе, если товар еще не находится в массиве minimalPrices, то заносим его туда
     */
    public compare = (product: IProduct) => {
        let equalProduct: IMinimal = _.find(this.minimalPrices, (each: IMinimal) => angular.equals(each.name, product.name));
        if (equalProduct !== undefined) {
            let equalProductIndex: number = _.findIndex(this.minimalPrices, (each: IMinimal) => angular.equals(each.name, product.name));
            if (product.discountPrice < equalProduct.price) {
                this.counter = 0;
                this.minimalPrices[equalProductIndex].price = product.discountPrice;
                this.minimalPrices[equalProductIndex].date = moment();
                this.topMinimal =  this.minimalPrices[equalProductIndex];
            } else {
               this.topMinimal = null;
               this.counter++;
            }
        } else {
            this.counter = 0;
            this.minimalPrices.push({
                name: product.name,
                price: product.discountPrice,
                date: moment()
            });
            this.topMinimal = this.minimalPrices[this.minimalPrices.length - 1];
        }
    }
}
