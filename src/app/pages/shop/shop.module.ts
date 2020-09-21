import * as angular from 'angular';
import { routing } from './shop.routes';
import { Shop } from './components/shop.component';

export const moduleName =
    angular
        .module('application.shop', ['ui.router'])
        .component(Shop.selector, Shop)
        .config(routing)
        .name;
