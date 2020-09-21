export class NavBarDirectiveCtrl {
    constructor(
        private $state: ng.ui.IStateService
    ) {
    }
    public goTodo = () => {
        this.$state.go('todolist');
    }
    public goShop = () => {
        this.$state.go('shop');
    }
    public goCart = () => {
        this.$state.go('cart');
    }
    public goHome = () => {
        this.$state.go('homepage');
    }
}
