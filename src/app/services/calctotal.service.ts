import * as _ from 'underscore';
import { cartProducts } from './../pages/cart/components/cartproucts';
import { ICartProduct } from './../models/cartproduct.interface';
import { IProduct } from './../models/product.interface';
import { products } from './../pages/shop/components/products';

export class CalcTotalService {
    public static selector = 'CalcTotalService';
    private allPoducts: Array<IProduct> = products;
    private cartProducts: Array<ICartProduct> = cartProducts;
    private totalPrice: number = 0;
    private totalCount: number = 0;

    public deleteFromCart = (index: number) => {
        _.find(this.allPoducts, (product: IProduct) => this.cartProducts[index].name === product.name).added = false;
        this.cartProducts.splice(index, 1);
        this.calcTotals();
    }

    public clearCart = () => {
        this.cartProducts.splice(0, this.cartProducts.length);
        this.calcTotals();
    }

    public calcTotals = (): void => {
        this.totalCount = this.calcTotalCount();
        this.totalPrice = this.calcTotalPrice();
    }

    public calcTotalCount = (): number => {
        return _.reduce(this.cartProducts, (count: number, product: ICartProduct) => count + product.count, 0);
    }

    public calcTotalPrice = (): number => {
        return _.reduce(this.cartProducts, (price: number, product: ICartProduct) => price + product.price, 0);
    }
    public getTotalCount = (): number => {
        return this.totalCount;
    }
    public getTotalPrice = (): number => {
        return this.totalPrice;
    }
    public getProductCount = (productName: string): number => {
        let addedProduct: ICartProduct = _.find(this.cartProducts, (each: ICartProduct) => productName === each.name);
        if (addedProduct !== undefined) {
            return addedProduct.count;
        } else {
            return;
        }
    }
}
