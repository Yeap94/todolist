import * as angular from 'angular';
import { RandomizerService } from './../../../services/randomizer.service';

class HomePageController {
    constructor (
        private RandomService: RandomizerService
    ) {

    }
}

export class HomePage implements angular.IComponentOptions {
    public static selector = 'homepage';
    public static controller = HomePageController;
    public static controllerAs = 'vm';
    public static template = require('./homepage.component.html');
}
