import { IDifferentPrices } from './prices';
export interface ICartProduct {
    name: string;
    differentPrices: Array<IDifferentPrices>;
}
