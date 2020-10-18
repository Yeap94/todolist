import * as angular from 'angular';
import { RandomizerService } from './../../services/randomizer.service';

class RootController {

    constructor(
        private RandomService: RandomizerService,
    ) {
    }
}

export class Root implements angular.IComponentOptions {
    public static selector = 'root';
    public static template = require('./root.component.html');
    public static controller = RootController;
}
