import { IDifferentPrices } from './prices';
export interface ICartProduct {
    name: string;
    isDiscount: boolean;
    differentPrices: Array<IDifferentPrices>;
}
