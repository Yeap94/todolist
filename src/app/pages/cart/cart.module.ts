import * as angular from 'angular';
import { routing } from './cart.routes';
import { Cart } from './components/cart.component';

export const moduleName =
    angular
        .module('application.cart', ['ui.router'])
        .component(Cart.selector, Cart)
        .config(routing)
        .name;
