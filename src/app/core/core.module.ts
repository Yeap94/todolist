import * as angular from 'angular';
import { Root } from './components/root.component';
import { routing } from './core.routes';
import { configLocation, configRoot } from './core.configuration';

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
    .config(configRoot)
    /**
     * Register Module Routing
     */
    .config(routing)
    .name;
