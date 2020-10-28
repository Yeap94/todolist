import * as _ from 'underscore';
import { cartProducts } from './../pages/cart/components/cartproucts';
import { ICartProduct } from '../models/cartproduct';
import { IProduct } from '../models/product';
import { products } from './../pages/shop/components/products';
import { IDifferentPrices } from '../models/prices';

/**
 * @description Сервис для подсчета общего количества и цены продуктов в корзине
 */
export class CalcTotalService {
    public static selector = 'CalcTotalService';
    private allPoducts: Array<IProduct> = products;
    private cartProducts: Array<ICartProduct> = cartProducts;
    private totalPrice: number = 0;
    private totalCount: number = 0;

    /**
     *
     * @param index - индекс элемента в массиве cartProducts
     * @description удаляет из массива cartProducts элемент по индексу
     */
    public deleteFromCart = (index: number) => {
        _.find(this.allPoducts, (product: IProduct) => this.cartProducts[index].name === product.name).added = false;
        this.cartProducts.splice(index, 1);
        this.calcTotals();
    }
    /**
     * @description полностью очищает корзину
     */
    public clearCart = () => {
        this.cartProducts.splice(0, this.cartProducts.length);
        _.forEach(products, (product: IProduct) => {
            product.added = false;
        });
        this.calcTotals();
    }
    /**
     * @description присваивает значения переменным "Общее количество" и "Общая цена" на основе функций
     */
    public calcTotals = (): void => {
        this.totalCount = this.calcTotalCount();
        this.totalPrice = this.calcTotalPrice();
    }

    public getProductTotalPrice = (item: ICartProduct): number => {
        return _.reduce(item.differentPrices, (acc: number, each: IDifferentPrices) => acc + each.price * each.count, 0);
    }

    public calcTotalPrice = (): number => {
        let accumulator = 0;
        _.forEach(this.cartProducts, (each: ICartProduct) => {
            accumulator += this.getProductTotalPrice(each);
        });
        return accumulator;
    }

    public getProductTotalCount = (item: string): number => {
        let addedProduct = _.find(this.cartProducts, (cartProduct: ICartProduct) => item === cartProduct.name);
        return _.reduce(addedProduct.differentPrices, (acc: number, each: IDifferentPrices) => acc + each.count, 0);
    }

    public calcTotalCount = (): number => {
        let accumulator = 0;
        _.forEach(this.cartProducts, (each: ICartProduct) => {
            accumulator += this.getProductTotalCount(each.name);
        });
        return accumulator;
    }

}
