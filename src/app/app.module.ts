import * as angular from 'angular';
/**
 * Import Application Modules
 */
import { moduleName as coreModule } from './core/core.module';
import { moduleName as todoModule } from './todolist/todolist.module';
import { moduleName as homepageModule } from './homepage/homepage.module';
export const moduleName =
  angular.module('application', [
    todoModule,
    homepageModule,
    coreModule
  ])
  .name;
