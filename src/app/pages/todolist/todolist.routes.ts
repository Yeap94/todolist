import { Todolist } from './components/todolist.component';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
    $stateProvider
        .state('todolist', {
            url: '/todolist',
            component: Todolist.selector
        });
};
