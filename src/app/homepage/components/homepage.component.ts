import * as angular from 'angular';

class HomePageController {
    constructor (
        private $state: angular.ui.IStateService
    ) {

    }

    public goTodo = () => {
        console.log('in goTodo');
        this.$state.go('todolist');
    }
}

export class HomePage implements angular.IComponentOptions {
    public static selector = 'homepage';
    public static controller = HomePageController;
    public static controllerAs = 'vm';
    public static template = require('./homepage.component.html');
}
