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

export const moduleName =
  angular.module('application', [
    todoModule,
    homepageModule,
    coreModule,
    shopModule,
    cartModule
  ])
  .service(RandomizerService.selector, RandomizerService)
  .name;
