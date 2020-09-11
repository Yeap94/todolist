export const configLocation = ($locationProvider: angular.ILocationProvider) => {
    'ngInject';
    $locationProvider.hashPrefix('');
};

export const configRoot = ($rootScopeProvider: angular.IRootScopeService) => {
    'ngInject';
};
