export const configLocation = ($locationProvider: angular.ILocationProvider) => {
    $locationProvider.hashPrefix('');
};

export const configRoot = ($rootScopeProvider: angular.IRootScopeService) => {
    'ngInject';
};
