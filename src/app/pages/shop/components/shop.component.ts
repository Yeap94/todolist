import * as angular from 'angular';
import { ICartProduct } from '../../../models/cartproduct';
import * as _ from 'underscore';
import { IProduct } from '../../../models/product';
import { RandomizerService } from './../../../services/randomizer.service';
import { products } from './products';
import { cartProducts } from './../../cart/components/cartproucts';
import { CalcTotalService } from './../../../services/calctotal.service';
import { IShopFilter } from '../../../models/shop-filter';
import { IDifferentPrices } from '../../../models/prices';

export class ShopController {

    private filteredProducts: Array<IProduct> = [];
    private cartProducts: Array<ICartProduct> = cartProducts;
    private timeout: ng.IPromise<void>;
    private shopFilter: IShopFilter;

    constructor (
        private $scope: ng.IScope,
        private RandomService: RandomizerService,
        private CalcTotalService: CalcTotalService,
        private $timeout: ng.ITimeoutService
    ) {
        this.filteredProducts = products;
        this.shopFilter = {
            name: '',
            minPrice: null,
            maxPrice: null,
            isDiscount: false
        };
        /**
         * @description watch-ер для того, чтобы при изменении ключа, говорящего о запуске функции goDiscount изRandomizerService
         * используется для того, чтобы применялся фильтр, описанный в applyFilter
         */
        this.$scope.$watch(() => this.RandomService.getIsGoDiscountStart(), (newValue: boolean, oldValue: boolean) => {
            this.applyFilter();
        });
    }
    /**
     *
     * @param product - элемент из ng-repeat. По сути номер объекта в массиве products
     * @description функция добавления в корзину товара по индексу. Сначала _.find находит соответствие товару product в массиве товаров корзины cartProducts
     * Далее, если товар был найден, то к цене элемента массива cartProducts с соответствующим именем прибавляется цена добавленного товара (суммируются цены)
     * Далее количество товаров увеличивается на единицу
     * Иначе, если товар не был найден в корзине (cartProducts), тогда выполняется добавление товара в данный массив с указанными property
     * product.added = true нужен для отображения/не отображения стикера на углу карточки товара с информацией о том, что товар добавлен в корзину
     */
    public addToCart = (product: IProduct) => {
        this.beautify(product);
        let productInCart: ICartProduct = _.find(this.cartProducts, (cartProduct: ICartProduct) => cartProduct.name === product.name);
        if (productInCart !== undefined) {
            let equalPrice: IDifferentPrices = _.find(productInCart.differentPrices, (differentPrice: IDifferentPrices) => differentPrice.price === product.discountPrice);
            if (equalPrice !== undefined) {
                equalPrice.count++;
            } else {
                productInCart.differentPrices.push({
                    price: product.discountPrice,
                    count: 1
                });
            }
        }  else {
            this.cartProducts.push({
                name: product.name,
                differentPrices: [{
                    price: product.discountPrice,
                    count: 1
                }]
            });
        }
        product.added = true;
        console.log('ShopController -> publicaddToCart -> this.cartProducts', this.cartProducts);
        this.CalcTotalService.calcTotals();
    }
    /**
     *
     * @param product - продукт из массива filteredProducts products
     * @description функиця используется для красивого отбражения количества товаров в корзине на стикере на карточке товара страницы shop
     * сначала останавливается timeout, чтобы не было наложений
     * затем элементу с ID, соответствующему маске добавляется класс time, после чего данный клас удаляется через секунду, что обеспечивает анимацию
     */
    private beautify = (product: IProduct): void => {
        this.$timeout.cancel(this.timeout);
        product.clickAdd = true;
        this.timeout = this.$timeout(() => {
            _.forEach(this.filteredProducts, (product: IProduct) => {
                product.clickAdd = false;
            });
        }, 1000);
    }
    /**
     *
     * @param price - строковое значение цены
     * @description функиця преобразует цену, введенную в input для фильра по цене согласно регексу
     * (все значения, кроме цифр от 0 до 9 заменяются на пустую строку, что обеспечивает возможность ввода ТОЛЬКО цифр)
     */
    private transformPrice = (price: string): string => {
        return price ? price.replace(/[^0-9]/g, '') : '';
    }
    /**
     * @description minPrice и maxPrice привязаны через ng-model к input в разметке.
     * Сначала для каждой из цен, которые являются строками, вызывается функция transformPrice при каждом изменении в input, так как на input стоит ng-change,
     * который и вызывает applyFilter
     * Затем значению max присваивается элемент с максимальной ценой из всего массива products(<IProducts> нужен для жесткого указания типа возвращаемого функцией _.max значения,
     * так как по дефотлу вернется number | IProduct, что не даст возможность получить доступ к property объекта max)
     * Далее переписывается массив filteredProducts (изначально он равен products)
     * метод _.filter вернет массив объектов, которые соответствуют указанному условию (+ используется для приведения minPrice и maxPrice к типу number)
     * соответственно, если в поля ввода minPrice и maxPrice ничего не введено, то им присваиваются 0 и max.discountPrice, что по сути выводит весь изначальный массив
     */
    private applyFilter = () => {
        this.shopFilter.minPrice = this.transformPrice(this.shopFilter.minPrice);
        this.shopFilter.maxPrice = this.transformPrice(this.shopFilter.maxPrice);
        let max = <IProduct>_.max(products, (product: IProduct) => product.discountPrice);
        this.filteredProducts = _.filter(products, (product: IProduct) => {
            return  product.discountPrice >= (+this.shopFilter.minPrice || 0) &&
                    product.discountPrice <= (+this.shopFilter.maxPrice || max.discountPrice);
        });
    }
}

export class Shop implements angular.IComponentOptions {
    public static selector = 'shoppage';
    public static controller = ShopController;
    public static controllerAs = 'vm';
    public static template = require('./shop.component.html');
}
