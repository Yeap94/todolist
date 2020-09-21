import * as angular from 'angular';
/**
 * Import Application Modules
 */
import { moduleName as coreModule } from './core/core.module';
import { moduleName as todoModule } from './pages/todolist/todolist.module';
import { moduleName as homepageModule } from './pages/homepage/homepage.module';
import { moduleName as shopModule } from './pages/shop/shop.module';
import { moduleName as cartModule } from './pages/cart/cart.module';
/**
 * Import Application Services
 */
import { RandomizerService } from './services/randomizer.service';
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
    cartModule
  ])
  .service(RandomizerService.selector, RandomizerService)
  .directive(selector, NavbarDirective)
  .name;
