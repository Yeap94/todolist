import * as _ from 'underscore';
import { cartProducts } from './../pages/cart/components/cartproucts';
import { ICartProduct } from '../models/cartproduct';
import { IProduct } from '../models/product';
import { products } from './../pages/shop/components/products';
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
    /**
     * @description при момщи метода reduce полчаем общее количество продуктов в корзине (отсчет ведется с 0)
     * используется для отображения количества товаров одного типа, так как изменяется само property product.count для каждого продукта
     */
    public calcTotalCount = (): number => {
        return _.reduce(this.cartProducts, (count: number, product: ICartProduct) => count + product.count, 0);
    }
    /**
     * @description при момщи метода reduce полчаем общую стоимость продуктов в корзине (отсчет ведется с 0)
     * используется для отображения цены товаров одного типа, так как изменяется само property product.price для каждого продукта
     */
    public calcTotalPrice = (): number => {
        return _.reduce(this.cartProducts, (price: number, product: ICartProduct) => price + product.price, 0);
    }
    /**
     * @description get-тер для общего числа продуктов
     */
    public getTotalCount = (): number => {
        return this.totalCount;
    }
    /**
     * @description get-тер для общей цены продуктов
     */
    public getTotalPrice = (): number => {
        return this.totalPrice;
    }
    /**
     *
     * @param productName имя продукта, которое приходит из разметки на странице Shop
     * @description используется для отображения количества товаров одного типа, добавленных в корзину, на флажке на карточке товара страницы Shop
     */
    public getProductCount = (productName: string): number => {
        console.log('CalcTotalService -> productName', productName);
        let addedProduct: ICartProduct = _.find(this.cartProducts, (each: ICartProduct) => productName === each.name);
        if (addedProduct !== undefined) {
            return addedProduct.count;
        } else {
            return;
        }
    }
}
