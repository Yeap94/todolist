import * as angular from 'angular';
import { RandomizerService } from '../../../services/randomizer.service';

class HomePageController {
    private randomIndex: number;
    constructor (
        private $state: angular.ui.IStateService,
        private randomService: RandomizerService,
        private $interval: ng.IIntervalService

    ) {
        // this.randomService.getRandomIndex();
        this.randomService.getRandomDiscount();
    }
    public goTodo = () => {
        this.$state.go('todolist');
    }
    public goShop = () => {
        this.$state.go('shop');
    }
}

export class HomePage implements angular.IComponentOptions {
    public static selector = 'homepage';
    public static controller = HomePageController;
    public static controllerAs = 'vm';
    public static template = require('./homepage.component.html');
}
