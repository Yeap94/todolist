import * as angular from 'angular';
import { RandomizerService } from './../../services/randomizer.service';

class RootController {

    constructor(
        /**
         * @description injection для того, чтобы рандомайер цен запускался вместе с запуском приложения вне зависимости от страницы
         */
        private RandomService: RandomizerService,
    ) {
    }
}

export class Root implements angular.IComponentOptions {
    public static selector = 'root';
    public static template = require('./root.component.html');
    public static controller = RootController;
}
