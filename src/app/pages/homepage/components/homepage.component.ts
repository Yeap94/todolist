import * as angular from 'angular';

export class HomePage implements angular.IComponentOptions {
    public static selector = 'homepage';
    public static template = require('./homepage.component.html');
}
