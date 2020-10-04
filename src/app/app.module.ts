import * as angular from 'angular';
/**
 * Import Application Modules
 */
import { moduleName as coreModule } from './core/core.module';
import { moduleName as todoModule } from './pages/todolist/todolist.module';
import { moduleName as homepageModule } from './pages/homepage/homepage.module';
import { moduleName as shopModule } from './pages/shop/shop.module';
import { moduleName as cartModule } from './pages/cart/cart.module';
import { moduleName as minimalModule } from './pages/minimal-price/minimal.module';
/**
 * Import Application Services
 */
import { RandomizerService } from './services/randomizer.service';
import { CalcTotalService } from './services/CalcTotal.service';
import { FindMinimalPriceService } from './services/findminimal.service';
/**
 * Import Application Directives
 */
import { NavbarDirective, selector } from './directives/navbardirective/navbar.directive';

export const moduleName =
  angular.module('application', [
    todoModule,
    homepageModule,
    coreModule,
    shopModule,
    cartModule,
    minimalModule
  ])
  .service(RandomizerService.selector, RandomizerService)
  .service(CalcTotalService.selector, CalcTotalService)
  .service(FindMinimalPriceService.selector, FindMinimalPriceService)
  .directive(selector, NavbarDirective)
  .name;
