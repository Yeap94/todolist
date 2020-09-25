import * as angular from 'angular';

export const selector: string = 'navbarDirective';
export function NavbarDirective(): angular.IDirective {
    let navbarDirectiveFunc: angular.IDirective = {};
    navbarDirectiveFunc.template = require ('./components/navbar.component.html');
    return navbarDirectiveFunc;
}
