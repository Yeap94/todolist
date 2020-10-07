import * as angular from 'angular';
import { routing } from './minimal.routes';
import { MinimalPrice } from './components/minimal.component';

export const moduleName =
    angular
        .module('application.minimal', ['ui.router', 'ui.carousel'])
        .component(MinimalPrice.selector, MinimalPrice)
        .config(routing)
        .name;
