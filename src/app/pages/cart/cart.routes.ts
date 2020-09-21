import { Cart } from './components/cart.component';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
    $stateProvider
        .state('cart', {
            url: '/cart',
            component: Cart.selector
        });
};
