import { Root } from './components/root.component';

export const routing = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/',
      component: Root.selector
    });

    $urlRouterProvider.otherwise('/homepage');
};
