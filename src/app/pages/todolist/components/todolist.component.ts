import * as angular from 'angular';
import * as _ from 'underscore';
import * as moment from 'moment';
import { ITodoItem } from './../../../models/todoitem.interface';
import { ILogOfTask } from './../../../models/log.interface';

class TodoController {
    private reverseSort: boolean = false;
    private orderByFiled: string = 'position';
    private newTaskName: string;
    private todoList: Array<ITodoItem> = [];
    private logTask: Array<ILogOfTask> = [];
    $onInit = () => {
        this.todoList.push(
            {
                position: this.todoList.length + 1,
                name: 'Sample',
                date: moment(),
                status: true
            }
        );
    }
    // добавление нового задания
    public addNewTask = () => {
        this.todoList.push({
            position: this.todoList.length + 1,
            name: this.newTaskName,
            date: moment(),
            status: false
        });
        this.logTask.push({
            name: this.newTaskName,
            date: moment(),
            action: 'Add'
        });
        this.newTaskName = null;
    }
    // изменение статуса задания
    public changeTaskStatus = (task: ITodoItem) => {
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
            action: `Status changed on ${changedStatus}`
        });
    }
    // удаление задания из списка
    public deleteTask = (index: number) => {
        // добавляет событие в массив logTask (история изменений)
        this.logTask.push({
            name: this.todoList[index].name,
            date: moment(),
            action: 'Delete'
        });
        this.todoList.splice(index, 1);
    }
    // очистка лога
    public clearLog = () => {
        this.logTask.splice(0, this.logTask.length);
    }
    public info = () => {
        console.log('Reverse is ', this.reverseSort, '\nOrderField is ', this.orderByFiled);
    }
}

export class Todolist implements angular.IComponentOptions {
    public static selector = 'todolist';
    public static controller = TodoController;
    public static controllerAs = 'vm';
    public static template = require('./todolist.component.html');
}
