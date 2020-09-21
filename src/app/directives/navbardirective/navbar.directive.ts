import * as angular from 'angular';
import { NavBarDirectiveCtrl } from './components/navbar.component';

export const selector: string = 'navbarDirective';
export function NavbarDirective(): angular.IDirective {
    let navbarDirectiveFunc: angular.IDirective = {};
    navbarDirectiveFunc.template = require ('./components/navbar.component.html');
    navbarDirectiveFunc.controller = NavBarDirectiveCtrl;
    navbarDirectiveFunc.controllerAs = 'vm';
    return navbarDirectiveFunc;
}
