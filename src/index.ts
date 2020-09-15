import 'core-js';
import 'angular';
import '@uirouter/angularjs';
import './app/themes/theme.scss';
import * as angular from 'angular';
import { moduleName as appModule } from './app/app.module';

const ModuleName = angular.module('todolistApp', [appModule]).name;
