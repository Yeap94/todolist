import { MinimalPrice } from './components/minimal.component';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
    $stateProvider
        .state('minimal', {
            url: '/minimal',
            component: MinimalPrice.selector
        });
};
