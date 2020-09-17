import * as angular from 'angular';
import { routing } from './todolist.routes';
import { Todolist } from './components/todolist.component';

export const moduleName =
    angular
        .module('application.todo', ['ui.router'])
        .component(Todolist.selector, Todolist)
        .config(routing)
        .name;
