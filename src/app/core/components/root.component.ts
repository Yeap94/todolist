import * as angular from 'angular';
import { RandomizerService } from './../../services/randomizer.service';
import { CalcTotalService } from './../../services/calctotal.service';
import { FindMinimalPriceService } from './../../services/findminimal.service';
import { ShopController } from './../../pages/shop/components/shop.component';
import { ModalService } from './../../services/modal.service';


class RootController {

    constructor(
        private ModalService: ModalService,
        private RandomService: RandomizerService,
        private $rootScope: ng.IRootScopeService,
        private CalcTotalService: CalcTotalService,
        private FindMinimalPriceService: FindMinimalPriceService,
        private $timeout: ng.ITimeoutService
    ) {
        let a = new ShopController(this.$rootScope, this.RandomService, this.CalcTotalService, this.FindMinimalPriceService, this.$timeout);
        a.init();
    }
}

export class Root implements angular.IComponentOptions {
    public static selector = 'root';
    public static template = require('./root.component.html');
    public static controller = RootController;
    public static controllerAs = 'vm';
}
