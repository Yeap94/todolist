import * as angular from 'angular';
import { Root } from './components/root.component';
import { routing } from './core.routes';
import { configLocation } from './core.configuration';

export const moduleName =
  angular
    .module('application.core', ['ui.router'])
    /*
     * Register Module Components
     */
    .component(Root.selector, Root)
    /*
     * Register Module Config
     */
    .config(configLocation)
    /**
     * Register Module Routing
     */
    .config(routing)
    .name;
