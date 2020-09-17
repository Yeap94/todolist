import { Shop } from './components/shop.component';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
    $stateProvider
        .state('shop', {
            url: '/shop',
            component: Shop.selector
        });
};
