import { IMinimal } from '../../../models/minimal.interface';
import { FindMinimalPriceService } from './../../../services/findminimal.service';

export class MinimalPriceController {
    constructor(
        private FindMinimalPriceService: FindMinimalPriceService,
    ) {
    }
}

export class MinimalPrice implements ng.IComponentOptions {
    public static selector = 'minimalPrice';
    public static controller = MinimalPriceController;
    public static controllerAs = 'vm';
    public static template  = require('./minimal.component.html');
}
