import { HomePage } from './components/homepage.component';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
    $stateProvider
        .state('homepage', {
            url: '/homepage',
            component: HomePage.selector
        });
};
