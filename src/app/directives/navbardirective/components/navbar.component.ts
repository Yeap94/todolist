import { RandomizerService } from './../../../services/randomizer.service';

export class NavBarDirectiveCtrl {
    private currentState: string = 'homepage';
    constructor(
        private $state: ng.ui.IStateService,
        private RandomService: RandomizerService

    ) {
    }
    public goTodo = () => {
        this.currentState = 'todoList';
        this.$state.go('todolist');
    }
    public goShop = () => {
        this.currentState = 'shop';
        this.$state.go('shop');
    }
    public goCart = () => {
        this.currentState = 'cart';
        this.$state.go('cart');
    }
    public goHome = () => {
        this.currentState = 'homepage';
        this.$state.go('homepage');
    }
}
