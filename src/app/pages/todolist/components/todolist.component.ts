import * as angular from 'angular';
import * as _ from 'underscore';
import * as moment from 'moment';
import { ITodoItem } from './../../../models/todoitem.interface';
import { ILogOfTask } from './../../../models/log.interface';

class TodoController {

    private reverseSort: boolean = false;
    private orderByField: string = 'position';
    private logReverseSort: boolean = true;
    private logOrderByField: string = 'date';
    private newTaskName: string;
    private modalIsOpened = false;
    private taskIndex: number;
    private todoList: Array<ITodoItem> = [];
    private logTask: Array<ILogOfTask> = []; // массив, в который записываются все действия и изменения в todoList

    $onInit = (): void => {
        this.todoList.push(
            {
                position: this.todoList.length + 1,
                name: 'Sample',
                date: moment(),
                status: true
            }
        );
    }

    /**
     * @description добавляет новое задание в список заданий
     */
    public addNewTask = (event?: any): void => {
        if ((event && event.key === 'Enter' || event === undefined) && this.newTaskName) {
            this.todoList.push({
                position: this.todoList.length + 1,
                name: this.newTaskName,
                date: moment(),
                status: false
            });
            this.logTask.push({
                name: this.newTaskName,
                date: moment(),
                action: 'Add',
                importance: 'add'
            });
            this.newTaskName = null;
        }
    }

    /**
     * @description изменяет статус задания на done/undone в списке  по кнопке или чекбоксу
     * @param task - задание, элемент массива todoList, для которого изменяется статус done/undone
     */
    public changeTaskStatus = (task: ITodoItem): void => {
        task.status = !task.status;
        let changedStatus: string;
        if (task.status) {
            changedStatus = 'Done';
        } else {
            changedStatus = 'Undone';
        }
        this.logTask.push({
            name: task.name,
            date: moment(),
            action: `Status changed on ${changedStatus}`,
            importance: 'changestatus'
        });
    }

    /**
     * @description удаляет задание из списка
     * @param index - индекс задания, на котором была нажата кнопка Delete
     */
    public agreeDeleteTask = (): void => {
        this.logTask.push({
            name: this.todoList[this.taskIndex].name,
            date: moment(),
            action: 'Delete',
            importance: 'delete'
        });
        this.todoList.splice(this.taskIndex, 1);
        this.modalIsOpened = false;
    }

    public deleteTask = (index: number): void => {
        this.modalIsOpened = true;
        this.taskIndex = index;
    }

    /**
     * @description функция сортировки значений таблицы по убыванию/возрастанию
     * @param field поле, по которому происходит сортировка. В разметке при вызове функции sortTask передается название столбца, на котором нужна фильтрация
     * @param clear - необязательный параметр, определяющий, нажата ли кнопка Cancel Filters (если данная кнопка нажала, то функция вызывается с двумя параметрами: position, true)
     */
    public sortTask = (field: string, clear?: boolean): void => {
        if (clear || !angular.equals(this.orderByField, field)) {
            this.reverseSort = false;
        } else {
            this.reverseSort = !this.reverseSort;
        }
        this.orderByField = field;
        this.logTask.push({
            name: '--',
            date: moment(),
            action: clear ? 'Cancel sort and filter' : `Sort by ${field}. Reverse: ${this.reverseSort}`,
            importance: 'filters'
        });
    }

    /**
     * @description функция очистки лога текущих событий
     */
    public clearLog = (): void => {
        this.logTask.splice(0, this.logTask.length);
    }
}

export class Todolist implements angular.IComponentOptions {
    public static selector = 'todolist';
    public static controller = TodoController;
    public static controllerAs = 'vm';
    public static template = require('./todolist.component.html');
}
