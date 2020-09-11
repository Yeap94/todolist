import * as angular from 'angular';
/**
 * Import Application Modules
 */
import { moduleName as todoModule } from './todolist/todolist.module';
export const moduleName =
  angular.module('application', [
    todoModule
  ])
  .name;
