import * as angular from 'angular';
import { routing } from './homepage.routes';
import { HomePage } from './components/homepage.component';

export const moduleName =
    angular
        .module('application.homePage', ['ui.router'])
        .component(HomePage.selector, HomePage)
        .config(routing)
        .name;
