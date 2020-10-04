import { IProduct } from './../models/product.interface';
import { IMinimal } from './../models/minimal.interface';
import { minimal } from './../pages/minimal-price/components/minimal';
import * as angular from 'angular';
import * as _ from 'underscore';
import * as moment from 'moment';

export class FindMinimalPriceService {
    public static selector = 'FindMinimalPriceService';
    public minimalPrices: Array<IMinimal> = minimal;

    public compare = (product: IProduct) => {
        let equalProduct: IMinimal = _.find(this.minimalPrices, (each: IMinimal) => angular.equals(each.name, product.name));
        if (equalProduct !== undefined) {
            let equalProductIndex: number = _.findIndex(this.minimalPrices, (each: IMinimal) => angular.equals(each.name, product.name));
            if (product.discountPrice < equalProduct.price) {
                this.minimalPrices[equalProductIndex].price = product.discountPrice;
                this.minimalPrices[equalProductIndex].date = moment();
            }
        } else {
            this.minimalPrices.push({
                name: product.name,
                price: product.discountPrice,
                date: moment()
            });
        }
    }
}
