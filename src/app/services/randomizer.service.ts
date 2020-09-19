import * as angular from 'angular';

export class RandomizerService {
    public static selector = 'randomService';
    private randomIndex: number;
    private randomDiscount: number;
    private startedIndex: boolean = false;
    private startedDiscount: boolean = false;

    constructor (
        private $interval: ng.IIntervalService
    ) {

    }

    public getRandomIndex = (): number => {
        if (!this.startedIndex) {
            this.startedIndex = true;
            this.$interval(() => {
                this.randomIndex = Math.floor(Math.random() * 100) % 7;
            }, 5000);
        }
        return this.randomIndex;
    }
    /**
     * @description генерирует случайное число от 0.01 до 0.99 - проценты скидки. floor - округляет число в меньшую сторону, random получает рандомное число от 0 до 1
     */
    public getRandomDiscount = () => {
        if (!this.startedDiscount) {
            this.startedDiscount = true;
            this.$interval(() => {
                this.randomDiscount = (Math.floor(Math.random() * 100) + 1) / 100;
            }, 5000);
        }
        return this.randomDiscount;
    }
}
